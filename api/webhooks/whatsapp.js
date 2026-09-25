/**
 * Official Meta WhatsApp Cloud API webhook.
 * Tokens live in Vercel env only. Never commit WHATSAPP_TOKEN.
 */
module.exports = async function handler(req, res) {
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    const expected = process.env.WHATSAPP_VERIFY_TOKEN;
    if (mode === "subscribe" && expected && token === expected) {
      res.status(200).send(challenge);
      return;
    }
    res.status(403).send("verify failed or WHATSAPP_VERIFY_TOKEN missing");
    return;
  }

  if (req.method === "POST") {
    res.status(200).json({
      received: true,
      cloudConfigured: Boolean(process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_ID),
      note: "Ack only. Sending stays off until owner sets Vercel env."
    });
    return;
  }

  res.setHeader("Allow", "GET, POST");
  res.status(405).end();
};
