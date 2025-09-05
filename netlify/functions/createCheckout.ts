import type { Handler } from "@netlify/functions";
import crypto from "node:crypto";
import fetch from "node-fetch";
import { prisma } from "./_prisma";
import { calculateSplit } from "../../src/server/split";

const RZP_KEY_ID = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID;
const RZP_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || process.env.VITE_RAZORPAY_KEY_SECRET;
const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY || process.env.VITE_STRIPE_SECRET_KEY;

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
  try {
    const body = JSON.parse(event.body || "{}");
    const { amount, currency = "INR", bookingId, storeId, freelancerId, serviceId, gateway = "razorpay" } = body as { amount: number; currency?: string; bookingId: string; storeId: string; freelancerId?: string; serviceId?: string; gateway?: "razorpay" | "stripe" };
    if (!amount || !bookingId || !storeId) return { statusCode: 400, body: "Missing fields" };

    const taxPct = 18;
    const tax = Math.round((amount * taxPct) / 100);
    const total = amount + tax;

    const split = await calculateSplit(amount, { storeId, serviceId, freelancerId });

    if (gateway === "razorpay") {
      if (!RZP_KEY_ID || !RZP_KEY_SECRET) return { statusCode: 500, body: "Razorpay env not set" };
      const r = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + Buffer.from(`${RZP_KEY_ID}:${RZP_KEY_SECRET}`).toString("base64"),
        },
        body: JSON.stringify({ amount: total * 100, currency, receipt: bookingId, notes: { storeId, freelancerId: freelancerId || "" } }),
      });
      if (!r.ok) return { statusCode: 502, body: await r.text() };
      const order = (await r.json()) as { id: string };
      const payment = await prisma.payment.create({ data: { bookingId, storeId, freelancerId, amount, tax, total, currency, gateway: "razorpay", gatewayRef: order.id, status: "created" } });
      await prisma.escrow.create({ data: { paymentId: payment.id, status: "pending" } });
      return { statusCode: 200, body: JSON.stringify({ orderId: order.id, gateway: "razorpay", paymentId: payment.id, split }) };
    } else {
      if (!STRIPE_SECRET) return { statusCode: 500, body: "Stripe env not set" };
      const r = await fetch("https://api.stripe.com/v1/payment_intents", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: `Bearer ${STRIPE_SECRET}` },
        body: new URLSearchParams({ amount: String(total * 100), currency: (currency || "inr").toLowerCase(), metadata: JSON.stringify({ bookingId, storeId, freelancerId: freelancerId || "" }) }),
      });
      if (!r.ok) return { statusCode: 502, body: await r.text() };
      const pi = (await r.json()) as { id: string; client_secret?: string };
      const payment = await prisma.payment.create({ data: { bookingId, storeId, freelancerId, amount, tax, total, currency, gateway: "stripe", gatewayRef: pi.id, status: "created" } });
      await prisma.escrow.create({ data: { paymentId: payment.id, status: "pending" } });
      return { statusCode: 200, body: JSON.stringify({ paymentIntentId: pi.id, clientSecret: pi.client_secret, gateway: "stripe", paymentId: payment.id, split }) };
    }
  } catch (e: any) {
    return { statusCode: 500, body: e.message || "error" };
  }
};

export { handler };
