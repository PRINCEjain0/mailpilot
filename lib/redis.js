import Redis from "ioredis";
export const redis = new Redis(
  "rediss://default:ATlNAAIjcDFiNzg5ZTY5YzU3MDY0ZTdlYTU2NGZmOGFlMGZkODUwYXAxMA@sincere-walrus-14669.upstash.io:6379",
  {
    maxRetriesPerRequest: null,
  }
);
