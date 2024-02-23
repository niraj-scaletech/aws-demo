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
                  FramerateControl: "INITIALIZE_FROM_SOURCE",
                  RateControlMode: "QVBR",
                  SceneChangeDetect: "TRANSITION_DETECTION",
                  QualityTuningLevel: "MULTI_PASS_HQ",
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
          },
        ],
        OutputGroupSettings: {
          Type: "HLS_GROUP_SETTINGS",
          HlsGroupSettings: {
            SegmentLength: 3,
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
        AutomatedEncodingSettings: {
          AbrSettings: {
            MaxRenditions: 5,
            MaxAbrBitrate: 1000000,
            MinAbrBitrate: 100000,
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
