import { loadS3IntoPinecone } from "@/lib/pinecode";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json();
    const { file_key, file_name } = body;
    console.log(file_key);
    const pages = await loadS3IntoPinecone(file_key);
    if (!pages) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    return NextResponse.json({ pages });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something Went Wrong  " },
      { status: 500 }
    );
  }
}
