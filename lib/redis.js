import Redis from "ioredis";
console.log("Redis URL:", process.env);
export const redis = new Redis(
  "rediss://default:AVCRAAIjcDFlMDNjYjE2ZmNlM2I0YmEyOGRiZWI4MjhjMTBjNWUyN3AxMA@deciding-walleye-20625.upstash.io:6379",
  {
    maxRetriesPerRequest: null,
  }
);
