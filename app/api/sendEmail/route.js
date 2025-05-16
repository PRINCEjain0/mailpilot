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
export async function POST(req) {
  const { email, name, recipient, subject, body, scheduleTime } =
    await req.json();

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
    const emailData = await prisma.email.create({
      data: {
        yourEmail: email,
        name: name,
        recipientEmail: recipient,
        subject: subject,
        body: body,
        scheduledTime: scheduleTime,
        status: "pending",
        userId: user.id,
      },
    });

    console.log("Email scheduled successfully", emailData);
    return NextResponse.json(
      { message: "Email scheduled successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error scheduling email", error);
    return NextResponse.json(
      { message: "Error scheduling email" },
      { status: 500 }
    );
  }
}
