import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';
const accessTokenSecret = process.env.JWT_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;


export const issueAccessToken = (payload) => {
    if (!accessTokenSecret) throw new Error("ACCESS_TOKEN_SECRET is not set");
  return jwt.sign(payload, accessTokenSecret, { expiresIn: ACCESS_TOKEN_EXPIRY });
};

export const issueRefreshToken = (payload) => {
  if (!refreshTokenSecret) throw new Error("REFRESH_TOKEN_SECRET is not set");
  return jwt.sign(payload, refreshTokenSecret, { expiresIn: REFRESH_TOKEN_EXPIRY });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};
