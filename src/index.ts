const client = new S3Client({ region: "eu-central-1" });


export const handler = async (
  event: any,
  context: Context
): Promise<unknown> => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  /* try {
    const bucket = event.Records[0].s3.bucket.name;
    const key = event.Records[0].s3.object.key;

    const params = {
      Bucket: bucket,
      Key: key,
    };

    console.log("params", params);

    const fileNameArr = key.split("/");
    const sourcePath = fileNameArr.slice(0, -1).join("/");
    let fileName = fileNameArr[fileNameArr.length - 1]
      .split(".")
      .slice(0, -1)
      .join(".");
    fileName =
      fileName && fileName !== ""
        ? fileName
        : fileNameArr[fileNameArr.length - 1];

    const destination = `${sourcePath}/m3u8/${fileName}`;

    const mediaData = {
      ...params,
      sourcePath,
      destination,
      fileName,
    };

    console.log("mediaData ", mediaData);

await ElementalMediaConverter.mediaConvert(mediaData),
     
    return;
  } catch (err) {
    console.log(err);
  }  */
};
handler({})