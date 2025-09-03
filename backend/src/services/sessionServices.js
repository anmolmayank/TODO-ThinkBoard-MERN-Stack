import Session from "../models/Session.js";

export const createSession = async (user, refreshToken, expiresInDays = 7) => {
  const session = new Session({
    user,
    refreshToken,
    expiresAt: new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000),
  });
  return await session.save();
};

/**
 * Find a session by userId and refresh token
 * Returns a query so populate can work
 */
export const findSession = (userId, token) => {
  return Session.findOne({ user: userId, refreshToken: token }).populate("user");
};

// Single current session logout
export const deleteSession = async (user) => {
  return await Session.deleteOne({ user });
};

// All session logout - Global logout
export const deleteUserSessions = async (user) => {
  return await Session.deleteMany({ user });
};
