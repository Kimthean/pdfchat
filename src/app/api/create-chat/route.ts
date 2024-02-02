import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json();
    const { file_key, file_name } = body;

    return NextResponse.json({ file_key, file_name });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error:" },
      { status: 500 }
    );
  }
}
