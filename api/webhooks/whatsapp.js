module.exports = async function handler(req, res) {
  if (req.method === "GET" && String(req.query.probe || "") === "1") {
    res.status(200).json({
      verify: process.env.WHATSAPP_VERIFY_TOKEN ? "awaiting" : "missing",
      cloud: process.env.WHATSAPP_TOKEN ? "env_set" : "unauthorized",
      instagram: "locked",
    });
    return;
  }
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    const expected = process.env.WHATSAPP_VERIFY_TOKEN;
    if (!expected) {
      res.status(403).send("WHATSAPP_VERIFY_TOKEN missing");
      return;
    }
    if (mode === "subscribe" && token === expected && challenge) {
      res.status(200).send(String(challenge).slice(0, 256));
      return;
    }
    if (mode === "subscribe" || token) {
      res.status(403).send("verify failed");
      return;
    }
    res.status(200).send("awaiting handshake");
    return;
  }
  if (req.method === "POST") {
    res.status(200).json({
      received: true,
      cloudConfigured: Boolean(process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_ID),
    });
    return;
  }
  res.status(405).end();
};
