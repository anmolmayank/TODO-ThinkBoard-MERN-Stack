import bcrypt from "bcrypt";
import User from "../models/userAuth.js";
import {
  createSession,
  deleteUserSessions,
  findSession,
} from "../services/sessionServices.js";
import {
  issueAccessToken,
  issueRefreshToken,
  verifyRefreshToken,
} from "../services/tokenService.js";

// Register user - Passed
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({ name, email, passwordHash });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login user - Passed
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ error: "User not available / Invalid credentials" });

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword)
      return res.status(400).json({ error: "Invalid credentials" });

    const accessToken = issueAccessToken({
      userId: user._id,
      email: user.email,
    });
    const refreshToken = issueRefreshToken({ userId: user._id });

    await createSession(user._id, refreshToken);

    res.json({ accessToken, refreshToken });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Refresh token
export const refresh = async (req, res) => {
  try {
    // ✅ userId from authMiddleware (decoded access token, even if expired)
    const userId = req.user?.userId;
    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized: missing userId in token" });
    }

    // ✅ refreshToken from body
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token required" });
    }

    // ✅ Verify refresh token signature
    const decoded = verifyRefreshToken(refreshToken);
    if (decoded.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Refresh token does not match user" });
    }

    // ✅ Validate session
    const session = await findSession(
     userId,
    refreshToken,
    );
    if (!session) {
      return res
        .status(403)
        .json({ error: "Invalid or expired refresh token" });
    }

    // ✅ Issue new access token
    const newAccessToken = issueAccessToken({
      userId: decoded.userId,
      email: decoded.email,
    });

    return res.json({ accessToken: newAccessToken, userId: decoded.userId });
  } catch (err) {
    console.error("Refresh error:", err);
    return res.status(403).json({ error: "Invalid or expired refresh token" });
  }
};

// Logout user - Pass
export const logout = async (req, res) => {
  try {
    const userId = req.user?.userId; // from authMiddleware

    if (!userId) {
      return res.status(400).json({ error: "User ID required" });
    }
    // Remove ALL sessions for this user
    await deleteUserSessions(userId);

    res.json({ message: "Logged out successfully from all sessions" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
