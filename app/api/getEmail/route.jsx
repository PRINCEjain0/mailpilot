import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

function getCookies(req) {
  const cookie = req.headers.get("cookie") || "";
  const cookieObj = {};
  cookie.split(";").forEach((item) => {
    const [key, value] = item.split("=").map((v) => v?.trim());
    if (key && value) {
      cookieObj[key] = decodeURIComponent(value);
    }
  });
  return cookieObj;
}

export async function GET(req) {
  const cookies = getCookies(req);
  const userEmail = cookies.userEmail;

  if (!userEmail) {
    return NextResponse.json({ message: "Please sign-in" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  try {
    const emails = await prisma.email.findMany({
      where: {
        userId: user.id,
      },
    });
    if (!emails) {
      return new Response("No emails found", { status: 404 });
    }
    return NextResponse.json(emails);
  } catch (err) {
    console.error("Error fetching emails:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
