module.exports = async function handler(req, res) {
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    const expected = process.env.WHATSAPP_VERIFY_TOKEN;
    if (!expected) {
      res.status(403).send("WHATSAPP_VERIFY_TOKEN missing");
      return;
    }
    if (mode === "subscribe" && token === expected) {
      res.status(200).send(String(challenge || ""));
      return;
    }
    res.status(403).send("verify failed");
    return;
  }
  if (req.method === "POST") {
    res.status(200).json({
      received: true,
      cloudConfigured: Boolean(process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_ID)
    });
    return;
  }
  res.status(405).end();
};
