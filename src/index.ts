import mediaService from "./media-service";

export const handler = async (event: any, context?: any): Promise<unknown> => {
  try {
    console.log("event ==============>", JSON.stringify(event));

    const bucket = event.Records[0].s3.bucket.name;
    const key = event.Records[0].s3.object.key;

    const params = {
      Bucket: bucket,
      Key: key,
    };

    console.log("params", params);

    const keyArr = key.split("/");
    console.log("keyArr", keyArr);

    let fileName = keyArr[keyArr.length - 1].split(".").slice(0, -1).join(".");
    console.log("fileName", fileName);

    const mediaData = {
      ...params,
      fileName,
    };

    console.log("mediaData ", mediaData);

    const res = await mediaService.mediaConvert(mediaData);
    console.log("res ==========>", res);
    
    return res;
  } catch (err) {
    console.log(err);
  }
};
