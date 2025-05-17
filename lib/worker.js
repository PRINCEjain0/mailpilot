import { Worker } from "bullmq";
import { redis } from "@/lib/redis";
import { Resend } from "resend";
import prisma from "@prisma/client";
const emailWorker = new Worker("email", async (job) => {
  const { email, recipient, subject, body, emailId } = job.data;

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: email,
      to: recipient,
      subject: subject,
      html: body,
    });
    console.log(`Email sent to ${recipient}`);
    if (error) {
      throw new Error(`Error sending email: ${error}`);
    }
    console.log(`Email sent successfully: ${data}`);
  } catch (error) {
    console.error(`Error sending email to ${recipient}:`, error);
    throw error;
  }
});

emailWorker.on("completed", async (job) => {
  const { emailId } = job.data;
  await prisma.email.update({
    where: { id: emailId },
    data: { status: "success" },
  });
  console.log(`Marked email ID ${emailId} as success`);
});

emailWorker.on("failed", async (job, err) => {
  const { emailId } = job.data;
  await prisma.email.update({
    where: { id: emailId },
    data: { status: "failed" },
  });
  console.error(`Marked email ID ${emailId} as failed`, err);
});
