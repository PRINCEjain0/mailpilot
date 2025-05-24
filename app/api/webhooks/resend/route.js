import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, data } = body;

    console.log("Webhook received:", type, data);

    const emailId = data.tags?.email_id || data.headers?.["X-Email-ID"];

    if (!emailId) {
      console.error("No email ID found in webhook data");
      return NextResponse.json({ error: "No email ID found" }, { status: 400 });
    }

    const emailIdInt = parseInt(emailId);

    switch (type) {
      case "email.sent":
        await prisma.email.update({
          where: { id: emailIdInt },
          data: {
            status: "success",
            deliveredAt: new Date(),
          },
        });
        console.log(`Email ${emailIdInt} marked as delivered`);
        break;

      case "email.delivered":
        await prisma.email.update({
          where: { id: emailIdInt },
          data: {
            status: "success",
            deliveredAt: new Date(),
          },
        });
        console.log(`Email ${emailIdInt} delivered`);
        break;

      case "email.opened":
        await prisma.email.update({
          where: { id: emailIdInt },
          data: {
            opened: true,
            openedAt: new Date(),
          },
        });
        console.log(`Email ${emailIdInt} opened`);
        break;

      case "email.clicked":
        const existingEmail = await prisma.email.findUnique({
          where: { id: emailIdInt },
        });

        await prisma.email.update({
          where: { id: emailIdInt },
          data: {
            clicked: true,
            clickedAt: new Date(),
            clickCount: (existingEmail?.clickCount || 0) + 1,
          },
        });
        console.log(`Email ${emailIdInt} clicked`);
        break;

      case "email.bounced":
        await prisma.email.update({
          where: { id: emailIdInt },
          data: {
            status: "failed",
            bouncedAt: new Date(),
          },
        });
        console.log(`Email ${emailIdInt} bounced`);
        break;

      case "email.complained":
        await prisma.email.update({
          where: { id: emailIdInt },
          data: {
            status: "complained",
            complainedAt: new Date(),
          },
        });
        console.log(`Email ${emailIdInt} complained`);
        break;

      default:
        console.log(`Unhandled webhook type: ${type}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
