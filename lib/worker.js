import { Worker } from "bullmq";
import { redis } from "./redis.js";
import { Resend } from "resend";
import prisma from "./prisma.js";

const emailWorker = new Worker(
  "email",
  async (job) => {
    const { email, recipient, subject, body, emailId } = job.data;

    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
      const { data, error } = await resend.emails.send({
        from: "no-reply@princejain.tech",
        to: recipient,
        subject: subject,
        html: body,
      });

      if (error) {
        console.error("Resend API Error:", error);
        throw new Error(`Error sending email: ${JSON.stringify(error)}`);
      }

      console.log(`Email sent successfully to ${recipient}:`, data);
    } catch (error) {
      console.error(`Error sending email to ${recipient}:`, error);
      throw error;
    }
  },
  {
    connection: redis,
  }
);

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
  console.error(`Marked email ID ${emailId} as failed:`, err);
});
