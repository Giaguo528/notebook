import { sessionCookie } from "./_auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method not allowed" });
    return;
  }

  const expected = process.env.DIARY_PIN;
  if (!expected) {
    res.status(500).json({ error: "server not configured: set the DIARY_PIN env var" });
    return;
  }

  const { pin } = req.body ?? {};
  if (pin !== expected) {
    res.status(401).json({ error: "wrong pin" });
    return;
  }

  res.setHeader("Set-Cookie", sessionCookie());
  res.status(200).json({ ok: true });
}
