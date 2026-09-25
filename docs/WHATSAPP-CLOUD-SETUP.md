# Official WhatsApp Cloud API (legal path)

Webhook URL: `https://social.pse-sent.com/api/webhooks/whatsapp`

## Owner steps

1. Meta Business Suite — verified business.
2. Create a Business app — add WhatsApp product.
3. Copy Phone Number ID + WhatsApp Business Account ID.
4. System user — permanent token. Put **only** in Vercel env:
   - `WHATSAPP_TOKEN`
   - `WHATSAPP_PHONE_ID`
   - `WHATSAPP_BUSINESS_ACCOUNT_ID`
   - `WHATSAPP_VERIFY_TOKEN`
5. Webhook subscribe `messages`. Verify token must match env.
6. Opt-in before first outbound message. Include STOP. Respect 24h session window.

## Send (after env exists)

POST `https://graph.facebook.com/v20.0/${WHATSAPP_PHONE_ID}/messages`
Authorization: Bearer from env — never from chat or git.

## Not this path

Unofficial WhatsApp Web clients, pasted tokens in Linear, Instagram unlock.
PSE-7 stays paste destination until Cloud env is set and a test inbound webhook is verified.
