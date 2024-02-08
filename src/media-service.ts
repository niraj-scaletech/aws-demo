import Firebase from "./lib/firebase";
import { MEDIA_CONVERT_PARAMS } from "./constant";
import {
  MediaConvertClient,
  CreateJobCommand,
} from "@aws-sdk/client-mediaconvert";
import { v4 } from "uuid";

const client = new MediaConvertClient({
  region: "ap-northeast-1",
  endpoint: process.env.MEDIA_CONVERT_ENDPOINT,
});

class ElementalMedia {
  constructor() {}

  public async mediaConvert(mediaData): Promise<any> {
    try {
      const newUuid = v4();
      var params: any = await this.getParams(mediaData, newUuid);

      const command = new CreateJobCommand(params);
      const data = await client.send(command);

      console.log("Job created! ", data);

      const streamingUrl = `${process.env.AWS_URL}/${newUuid}/m3u8/${mediaData?.fileName}.m3u8`;
      const thumbnailUrl = `${process.env.AWS_URL}/${newUuid}/thumbnail/${mediaData?.fileName}-thumbnail.0000001.jpg`;
      const res = {
        streamingUrl,
        thumbnailUrl,
      };

      await Firebase.updateUserMediaConvert({ [newUuid]: res });
      console.log("streaming url updated successfully!");

      return res;
    } catch (err) {
      console.log("Error=====>", err);
    }
  }

  public async getParams(mediaData, newUuid) {
    var params = MEDIA_CONVERT_PARAMS;

    params.Settings.Inputs[0].FileInput =
      process.env.S3_SOURCE_BUCKET + `/${mediaData.Key}`;
    params.Settings.OutputGroups[0].OutputGroupSettings.HlsGroupSettings.Destination = `${process.env.S3_DESTINATION_BUCKET}/${newUuid}/m3u8/${mediaData?.fileName}`;
    params.Settings.OutputGroups[1].OutputGroupSettings.FileGroupSettings.Destination = `${process.env.S3_DESTINATION_BUCKET}/${newUuid}/thumbnail/${mediaData?.fileName}`;
    return params;
  }
}

const mediaService = new ElementalMedia();
export default mediaService;
