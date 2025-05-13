import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const token = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: "http://localhost:3000/api/auth/callback",
      grant_type: "authorization_code",
    }),
  });

  const tokenData = await token.json();

  if (!tokenData.access_token) {
    return NextResponse.json(
      { error: "Failed to fetch token" },
      { status: 500 }
    );
  }

  const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
    },
  });

  const userData = await userRes.json();
  console.log("Google User Data:", userData);
  if (!userData.email) {
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  if (!user) {
    const newUser = await prisma.User.create({
      data: {
        name: userData.name,
        email: userData.email,
        profile: userData.picture,
      },
    });

    console.log("New user created:", newUser);

    if (!newUser) {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }
  }

  const response = NextResponse.redirect("http://localhost:3000/");
  response.cookies.set("userEmail", userData.email, {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
