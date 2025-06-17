import Redis from "ioredis";
export const redis = new Redis(
  "rediss://default:AcK5AAIjcDE4NjkxZmNiZTc5ZDI0ZjFlYWVmMmZjMmYyZWQ1ODQyOXAxMA@live-dragon-49849.upstash.io:6379",
  {
    maxRetriesPerRequest: null,
  }
);
