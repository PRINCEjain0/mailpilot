import { Queue } from "bullmq";
import { redis } from "@/lib/redis";

export const emailQueue = new Queue("email", {
  connection: redis,
});
