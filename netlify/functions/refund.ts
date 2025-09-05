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
    const { paymentId, amount, reason } = JSON.parse(event.body || "{}");
    if (!paymentId || !amount) return { statusCode: 400, body: "paymentId and amount required" };
    const p = await prisma.payment.findUnique({ where: { id: paymentId } });
    if (!p) return { statusCode: 404, body: "payment not found" };

    if (p.gateway === "razorpay") {
      if (!RZP_KEY_ID || !RZP_KEY_SECRET) return { statusCode: 500, body: "Razorpay env not set" };
      const r = await fetch(`https://api.razorpay.com/v1/payments/${p.gatewayRef}/refund`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Basic " + Buffer.from(`${RZP_KEY_ID}:${RZP_KEY_SECRET}`).toString("base64") },
        body: JSON.stringify({ amount: amount * 100, notes: { reason: reason || "" } }),
      });
      if (!r.ok) return { statusCode: 502, body: await r.text() };
      const ref = await r.json();
      await prisma.refund.create({ data: { paymentId, amount, reason, status: "succeeded", gatewayRef: ref.id } });
      await prisma.payment.update({ where: { id: paymentId }, data: { status: "refunded" } });
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    } else {
      if (!STRIPE_SECRET) return { statusCode: 500, body: "Stripe env not set" };
      const r = await fetch("https://api.stripe.com/v1/refunds", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: `Bearer ${STRIPE_SECRET}` }, body: new URLSearchParams({ payment_intent: p.gatewayRef || "", amount: String(amount * 100) }) });
      if (!r.ok) return { statusCode: 502, body: await r.text() };
      const ref = await r.json();
      await prisma.refund.create({ data: { paymentId, amount, reason, status: "succeeded", gatewayRef: ref.id } });
      await prisma.payment.update({ where: { id: paymentId }, data: { status: "refunded" } });
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }
  } catch (e: any) {
    return { statusCode: 500, body: e.message || "error" };
  }
};

export { handler };
