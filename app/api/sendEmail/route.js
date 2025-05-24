import { NextResponse } from "next/server";
import { emailQueue } from "@/lib/queue";
import prisma from "@/lib/prisma";

export async function POST(req) {
  const { email, name, recipient, subject, body, scheduleTime, userEmail } =
    await req.json();

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
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 10000,
        },
      }
    );

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
