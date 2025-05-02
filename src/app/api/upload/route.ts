import { NextRequest, NextResponse } from "next/server";
import { getPresignedUrl } from "@/lib/actions";

export async function POST(request: NextRequest) {
  try {
    const { key, contentType } = await request.json();

    const response = await getPresignedUrl({
      key,
      contentType,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error getting presigned URL:", error);
    return NextResponse.json(
      { error: "Failed to get presigned URL" },
      { status: 500 }
    );
  }
}
