import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Signed out successfully" },
      { status: 200 }
    );

    response.cookies.set("userEmail", "", {
      expires: new Date(0),
      path: "/",
      httpOnly: false,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Error signing out" }, { status: 500 });
  }
}
