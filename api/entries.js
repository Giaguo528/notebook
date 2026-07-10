import { verifySession } from "./_auth.js";
import { redis } from "./_redis.js";

const KEY = "diary:entries";

export default async function handler(req, res) {
  if (!verifySession(req)) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }

  if (!redis) {
    res.status(500).json({ error: "database not configured" });
    return;
  }

  if (req.method === "GET") {
    const data = (await redis.get(KEY)) ?? {};
    res.status(200).json(data);
    return;
  }

  if (req.method === "POST" || req.method === "PUT") {
    const body = req.body ?? {};
    await redis.set(KEY, body);
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: "method not allowed" });
}
