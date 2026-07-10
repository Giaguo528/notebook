import { verifySession } from "./_auth.js";

export default function handler(req, res) {
  res.status(200).json({ authenticated: verifySession(req) });
}
