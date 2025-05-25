import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
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
    return NextResponse.json({ message: "Please sign-in" }, { status: 401 });
  }

  const leftoverEmails = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
    select: {
      leftoverEmails: true,
    },
  });

  console.log("Leftover Emails:", leftoverEmails.leftoverEmails);

  return NextResponse.json(
    { userEmail: userEmail, leftoverEmails: leftoverEmails.leftoverEmails },
    { status: 200 }
  );
}
