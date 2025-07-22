import Redis from "ioredis";
export const redis = new Redis(
  "redis-cli --tls -u redis://default:AXkdAAIjcDFlMzRmODg2M2U3YmQ0MTE1YjFhNjM3YmYxYmE0YjBmM3AxMA@touching-sparrow-31005.upstash.io:6379",
  {
    maxRetriesPerRequest: null,
  }
);
