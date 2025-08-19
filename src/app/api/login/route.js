import { NextResponse } from "next/server";
import { createAccessToken, jwtMiddleware } from "./jwt-middleware";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { id, username, expiresIn } = body;

    if (!id || !username) {
      return NextResponse.json(
        { message: "id and username are required" },
        { status: 400 }
      );
    }

    const token = await createAccessToken({ id, username }, expiresIn || "24h");
    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create token", error: String(error?.message || error) },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const decoded = await jwtMiddleware(request);
    return NextResponse.json({ valid: true, payload: decoded });
  } catch (error) {
    return NextResponse.json(
      { valid: false, message: String(error?.message || error) },
      { status: 401 }
    );
  }
}

