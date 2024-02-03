import { s3 } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

export async function getPdfFromS3(file_key: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const params = {
        Bucket: process.env.S3_BUCKET,
        Key: file_key,
      };

      const data = await s3.send(new GetObjectCommand(params));
      const file_name = `/tmp/${Date.now().toString()}.pdf`;

      if (data.Body instanceof require("stream").Readable) {
        const file = fs.createWriteStream(file_name);
        file.on("open", function (fd) {
          // @ts-ignore
          data.Body?.pipe(file).on("finish", () => {
            return resolve(file_name);
          });
        });
      }
    } catch (error) {
      console.error(error);
      reject(error);
      return null;
    }
  });
}
