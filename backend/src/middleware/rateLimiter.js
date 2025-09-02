import ratelimit from "../config/upStash.js";

// const rateLimiter = async (req, res, next) => {
//   // Placeholder for rate limiting logic
//   try {
//     const {success} = await ratelimit.limit("global");
//     if(!success) {
//       return res.status(429).json({message: "Too many requests, please try again later."});
//     }
//     next();
//   } catch (error){
//     console.error("Rate limiting error:", error);
//     next(error);
//     return res.status(500).json({message: "Internal server error"});
//   }
// }


export async function rateLimiter(req, res, next) {
  try {
    const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);

    if (!success) {
      return res.status(429).json({
        error: 'Too many requests. Please try again later.',
        limit,
        remaining,
        reset,
      });
    }

    next();
  } catch (err) {
    console.error("Rate limiting error:", error);
    next(error);
    return res.status(500).json({message: "Internal server error"});
  }
}
// You can implement rate limiting using libraries like express-rate-limit
export default rateLimiter;