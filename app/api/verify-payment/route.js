import { NextResponse } from "next/server";
import crypto from "crypto";
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
  const cookies = getCookies(req);
  const userEmail = cookies.userEmail;

  if (!userEmail) {
    console.error("User email not found in cookies");
    return NextResponse.json({ message: "Please sign-in" }, { status: 400 });
  }

  const body = await req.json();

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    plan,
    emails,
  } = body;

  const generated_signature = crypto
    .createHmac("sha256", process.env.key_secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature !== razorpay_signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  await prisma.user.update({
    where: {
      email: userEmail,
    },
    data: {
      plan: plan,
      leftoverEmails: emails,
    },
  });

  return NextResponse.json({ success: true });
}
