import { S3 } from "@aws-sdk/client-s3";

export async function s3() {
  return new S3({
    forcePathStyle: false,
    endpoint: "https://sgp1.digitaloceanspaces.com",
    region: "ap-southeast-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY!,
      secretAccessKey: process.env.S3_SECRET_KEY!,
    },
  });
}

export function getS3Url(file_key: string) {
  const url = `https://${process.env.S3_BUCKET}.s3.ap-southeast-1.amazonaws.com/${file_key}`;
  return url;
}
