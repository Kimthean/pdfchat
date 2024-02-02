import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/lib/s3";

export async function POST(request: NextRequest) {
  const s3Client = await s3();
  const formData = await request.formData();
  const files = formData.getAll("file") as File[];

  const response = await Promise.all(
    files.map(async (file) => {
      const Body = (await file.arrayBuffer()) as Buffer;
      const file_name = file.name;
      const file_key =
        "pdf/" + Date.now().toString() + file_name.replace(/ /g, "-");

      const params = {
        Bucket: process.env.S3_BUCKET!,
        Key: file_key,
        Body,
      };

      const result = await s3Client.send(new PutObjectCommand(params));
      return { result, file_name, file_key };
    })
  );

  return NextResponse.json(response);
}
