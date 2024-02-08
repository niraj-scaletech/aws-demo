export const MEDIA_CONVERT_PARAMS = {
  Queue: "arn:aws:mediaconvert:ap-northeast-1:249373568965:queues/Default",
  UserMetadata: {},
  Role: "arn:aws:iam::249373568965:role/service-role/MediaConvert_Default_Role_aws_poc",
  Settings: {
    TimecodeConfig: {
      Source: "ZEROBASED",
    },
    OutputGroups: [
      {
        Name: "Apple HLS",
        Outputs: [
          {
            ContainerSettings: {
              Container: "M3U8",
              M3u8Settings: {},
            },
            VideoDescription: {
              CodecSettings: {
                Codec: "H_264",
                H264Settings: {
                  MaxBitrate: 1000000,
                  RateControlMode: "QVBR",
                  SceneChangeDetect: "TRANSITION_DETECTION",
                  QualityTuningLevel: "SINGLE_PASS",
                },
              },
            },
            AudioDescriptions: [
              {
                AudioSourceName: "Audio Selector 1",
                CodecSettings: {
                  Codec: "AAC",
                  AacSettings: {
                    Bitrate: 96000,
                    CodingMode: "CODING_MODE_2_0",
                    SampleRate: 48000,
                  },
                },
              },
            ],
            OutputSettings: {
              HlsSettings: {},
            },
            NameModifier: "-convert",
          },
        ],
        OutputGroupSettings: {
          Type: "HLS_GROUP_SETTINGS",
          HlsGroupSettings: {
            SegmentLength: 10,
            Destination: "",
            DestinationSettings: {
              S3Settings: {
                AccessControl: {
                  CannedAcl: "PUBLIC_READ",
                },
              },
            },
            MinSegmentLength: 0,
          },
        },
      },
      {
        Name: "File Group",
        Outputs: [
          {
            ContainerSettings: {
              Container: "RAW",
            },
            VideoDescription: {
              CodecSettings: {
                Codec: "FRAME_CAPTURE",
                FrameCaptureSettings: {
                  MaxCaptures: 2,
                },
              },
            },
            Extension: "jpg",
            NameModifier: "-thumbnail",
          },
        ],
        OutputGroupSettings: {
          Type: "FILE_GROUP_SETTINGS",
          FileGroupSettings: {
            Destination: "",
            DestinationSettings: {
              S3Settings: {
                AccessControl: {
                  CannedAcl: "PUBLIC_READ",
                },
              },
            },
          },
        },
      },
    ],
    FollowSource: 1,
    Inputs: [
      {
        AudioSelectors: {
          "Audio Selector 1": {
            DefaultSelection: "DEFAULT",
          },
        },
        VideoSelector: {
          Rotate: "AUTO",
        },
        TimecodeSource: "ZEROBASED",
        FileInput: "",
      },
    ],
  },
  BillingTagsSource: "JOB",
  AccelerationSettings: {
    Mode: "DISABLED",
  },
  StatusUpdateInterval: "SECONDS_10",
  Priority: 0,
};
