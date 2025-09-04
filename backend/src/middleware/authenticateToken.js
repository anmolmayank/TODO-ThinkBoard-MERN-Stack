import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization header missing or invalid" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach to request
    req.user = { userId: decoded.userId, email: decoded.email };

    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}
