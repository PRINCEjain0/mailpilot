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
        reply_to: email,
        tags: [
          {
            name: "email_id",
            value: emailId.toString(),
          },
          {
            name: "campaign",
            value: "mailpilot",
          },
        ],
        headers: {
          "X-Email-ID": emailId.toString(),
        },
      });

      if (error) {
        console.error("Resend API Error:", error);
        throw new Error(`Error sending email: ${JSON.stringify(error)}`);
      }

      await prisma.email.update({
        where: { id: emailId },
        data: {
          resendId: data.id,
          status: "success",
        },
      });

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
  console.log(`Email job completed for ID ${emailId}`);
});

emailWorker.on("failed", async (job, err) => {
  const { emailId } = job.data;
  await prisma.email.update({
    where: { id: emailId },
    data: { status: "failed" },
  });
  console.error(`Marked email ID ${emailId} as failed:`, err);
});

export default emailWorker;
