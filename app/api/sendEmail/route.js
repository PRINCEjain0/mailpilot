import { NextResponse } from "next/server";
import { emailQueue } from "@/lib/queue";
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
    console.error("User email not found in cookies");
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

  const emailId = await prisma.email.count();

  try {
    const leftoverEmails = user.leftoverEmails;
    if (leftoverEmails == 0) {
      return NextResponse.json(
        { message: "You have no leftover emails left, Please purchase" },
        { status: 400 }
      );
    }
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
    let tries = 1;

    const plan = user.plan;

    if (plan === "Creator") {
      tries = 3;
    } else if (plan === "Superuser") {
      tries = 5;
    }

    await emailQueue.add(
      "sendEmail",
      {
        email: email,
        recipient: recipient,
        subject: subject,
        body: body,
        emailId: emailId + 1,
      },
      {
        delay: new Date(scheduleTime).getTime() - new Date().getTime(),
        attempts: tries,
        backoff: {
          type: "exponential",
          delay: 10000,
        },
      }
    );

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        leftoverEmails: leftoverEmails - 1,
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
