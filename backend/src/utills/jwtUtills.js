import jwt from 'jsonwebtoken';

export function signAccessToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), email: user.email, name: user.name },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_TTL || '15m' }
  );
}

export function signRefreshToken(user, sessionId) {
  return jwt.sign(
    { sub: user._id.toString(), sid: sessionId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_TTL || '7d' }
  );
}

export const refreshCookieOpts = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.COOKIE_SECURE === 'true',
  path: '/auth',
};

export function parseTtlMs(ttl) {
  if (/^\d+$/.test(ttl)) return parseInt(ttl, 10);
  const m = ttl.match(/^(\d+)([smhd])$/i);
  if (!m) throw new Error('Invalid TTL format');
  const n = parseInt(m[1], 10);
  const unit = m[2].toLowerCase();
  const mult = { s: 1000, m: 60000, h: 3600000, d: 86400000 }[unit];
  return n * mult;
}
export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    return null;
  }
}

export function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return null;
  }
}