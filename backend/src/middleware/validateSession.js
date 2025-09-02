import Session from '../models/Session.js';

export async function validateSession(req, res, next) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ error: 'Missing refresh token' });
    }

    const session = await Session.findOne({ refreshToken });
    if (!session) {
      return res.status(403).json({ error: 'Invalid session' });
    }

    // Check expiration
    if (session.expiresAt < new Date()) {
      await Session.deleteOne({ _id: session._id }); // cleanup
      return res.status(403).json({ error: 'Session expired' });
    }

    // Attach session to request for downstream use
    req.session = session;
    next();
  } catch (err) {
    console.error('Session validation error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
