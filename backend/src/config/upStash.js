import {Redis} from "@upstash/redis";
import {Ratelimit} from "@upstash/ratelimit";
import dotenv from "dotenv";

dotenv.config();

// Create a new ratelimiter, that allows 10 requests per 20seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "20 s"),
    analytics: true,
    prefix: "@upstash/ratelimit",
});

export default ratelimit;