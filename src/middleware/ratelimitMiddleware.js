import expressAsyncHandler from "express-async-handler";
import ratelimit from "../config/upstash.js";
import AppError from "../utils/AppError.js";

const rateLimiter = expressAsyncHandler(async (req, res, next) => {
  // ! You should pass the ID of user (use a real user id or `req.ip` in production)
  const { success } = await ratelimit.limit("user-id");
  if (!success) return next(new AppError("Too many requests, Try again later", 429));
  return next();
});

export default rateLimiter;
