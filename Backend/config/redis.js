const { createClient } = require("redis");

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";

const redisClient = createClient({
  url: redisUrl,
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 3) {
        console.warn("⚠️ Redis reconnect retries exhausted. Running without Redis cache.");
        return new Error("Redis connection exhausted");
      }
      return Math.min(retries * 500, 2000);
    },
  },
});

redisClient.on("connect", () => {
  console.log("✅ Redis connected successfully");
});

redisClient.on("ready", () => {
  console.log("✅ Redis client is ready");
});

redisClient.on("error", (err) => {
  // Prevent unhandled error crashes when Redis is offline locally
  console.warn("⚠️ Redis client warning:", err.message);
});

(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.warn("⚠️ Redis initial connection failed (using in-memory fallback):", err.message);
  }
})();

module.exports = redisClient;
