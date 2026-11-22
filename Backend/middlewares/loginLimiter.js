const { rateLimit, MemoryStore } = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const redisClient = require("../config/redis");

let activeStore = new MemoryStore();

// Upgrade to Redis store as soon as Redis is ready
redisClient.on("ready", () => {
  try {
    const redisStore = new RedisStore({
      sendCommand: (...args) => redisClient.sendCommand(args),
    });
    if (typeof redisStore.init === "function") {
      redisStore.init({ windowMs: 15 * 60 * 1000 });
    }
    activeStore = redisStore;
    console.log("🛡️ Login rate limiter: switched to Redis store");
  } catch (err) {
    console.warn("⚠️ Could not initialize Redis rate-limit store, using MemoryStore:", err.message);
  }
});

redisClient.on("end", () => {
  activeStore = new MemoryStore();
});

const resilientStore = {
  init(options) {
    if (activeStore.init) return activeStore.init(options);
  },
  increment(key) {
    return activeStore.increment(key);
  },
  decrement(key) {
    return activeStore.decrement(key);
  },
  resetKey(key) {
    return activeStore.resetKey(key);
  },
  resetAll() {
    if (activeStore.resetAll) return activeStore.resetAll();
  },
};

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 5, // Limit each IP to 5 login attempts per window
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
  store: resilientStore,
});

module.exports = loginLimiter;
