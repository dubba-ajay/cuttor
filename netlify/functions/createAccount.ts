import type { Handler } from "@netlify/functions";
import fetch from "node-fetch";
import { prisma } from "./_prisma";

const RZP_KEY_ID = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID;
const RZP_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || process.env.VITE_RAZORPAY_KEY_SECRET;
const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY || process.env.VITE_STRIPE_SECRET_KEY;

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
  const adminKey = process.env.ADMIN_API_KEY || process.env.VITE_ADMIN_API_KEY;
  const provided = event.headers["x-admin-key"] || event.headers["X-Admin-Key"];
  if (!adminKey || provided !== adminKey) return { statusCode: 401, body: "unauthorized" } as any;
  try {
    const { type, gateway, email, name, bankIfsc, bankAccount } = JSON.parse(event.body || "{}");
    if (!type || !gateway || !email || !name) return { statusCode: 400, body: "missing fields" };

    let gatewayAccountId: string | undefined;

    if (gateway === "razorpay") {
      if (!RZP_KEY_ID || !RZP_KEY_SECRET) return { statusCode: 500, body: "Razorpay env not set" };
      const r = await fetch("https://api.razorpay.com/v2/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Basic " + Buffer.from(`${RZP_KEY_ID}:${RZP_KEY_SECRET}`).toString("base64") },
        body: JSON.stringify({
          email,
          name,
          tnc_accepted: true,
          account_details: bankIfsc && bankAccount ? { ifsc_code: bankIfsc, account_number: bankAccount, account_type: "bank_account" } : undefined,
        }),
      });
      if (!r.ok) return { statusCode: 502, body: await r.text() };
      const acc = await r.json();
      gatewayAccountId = acc?.id;
    } else if (gateway === "stripe") {
      if (!STRIPE_SECRET) return { statusCode: 500, body: "Stripe env not set" };
      const r = await fetch("https://api.stripe.com/v1/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: `Bearer ${STRIPE_SECRET}` },
        body: new URLSearchParams({ type: "express", email, business_type: "individual" }),
      });
      if (!r.ok) return { statusCode: 502, body: await r.text() };
      const acc = await r.json();
      gatewayAccountId = acc?.id;
    } else {
      return { statusCode: 400, body: "unknown gateway" };
    }

    const rec = await prisma.account.create({ data: { type, ownerEmail: email, gateway, gatewayAccount: gatewayAccountId, kycStatus: gatewayAccountId ? "pending" : "pending", bankIfsc, bankAccount } });
    return { statusCode: 200, body: JSON.stringify({ id: rec.id, gatewayAccountId }) };
  } catch (e: any) {
    return { statusCode: 500, body: e.message || "error" };
  }
};

export { handler };
