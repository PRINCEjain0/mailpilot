import { NextResponse } from "next/server";
export async function Get(req) {
  const { searchparams } = new URL(req.url);

  const code = searchparams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const token = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    header: {
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

  const response = NextResponse.redirect("http://localhost:3000/");
  response.cookies.set("userEmail", userData.email, {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
