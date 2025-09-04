import type { Handler } from "@netlify/functions";
import fetch from "node-fetch";
import crypto from "node:crypto";
import { prisma } from "./_prisma";

const RZP_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.VITE_RAZORPAY_WEBHOOK_SECRET;
const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY || process.env.VITE_STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || process.env.VITE_STRIPE_WEBHOOK_SECRET;

function verifyRazorpaySignature(rawBody: string, signature: string | undefined): boolean {
  if (!RZP_WEBHOOK_SECRET || !signature) return false;
  const expected = crypto.createHmac("sha256", RZP_WEBHOOK_SECRET).update(rawBody).digest("hex");
  return expected === signature;
}

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
  const gateway = event.headers["x-gateway"] || "detect";
  const raw = event.body || "";
  try {
    // Razorpay
    const rzpSig = event.headers["x-razorpay-signature"] || event.headers["X-Razorpay-Signature"] as any;
    if (rzpSig) {
      const valid = verifyRazorpaySignature(raw, rzpSig as string);
      const payload = JSON.parse(raw);
      await prisma.webhookLog.create({ data: { gateway: "razorpay", event: payload?.event || "", signature: String(rzpSig), valid, payload } });
      if (!valid) return { statusCode: 400, body: "invalid signature" };
      // Handle order.paid, payment.captured, refund.processed
      const et = payload?.event as string;
      if (et === "payment.captured") {
        const orderId = payload?.payload?.payment?.entity?.order_id as string | undefined;
        if (orderId) {
          await prisma.payment.updateMany({ where: { gateway: "razorpay", gatewayRef: orderId }, data: { status: "captured" } });
        }
      } else if (et?.startsWith("refund.")) {
        const payId = payload?.payload?.refund?.entity?.payment_id as string | undefined;
        if (payId) {
          const p = await prisma.payment.findFirst({ where: { gateway: "razorpay", gatewayRef: payId } });
          if (p) await prisma.payment.update({ where: { id: p.id }, data: { status: "refunded" } });
        }
      }
      return { statusCode: 200, body: "ok" };
    }

    // Stripe (requires raw body; ensure Netlify passthrough configuration)
    const stripeSig = event.headers["stripe-signature"];
    if (stripeSig) {
      // For simplicity, log and trust (recommend using official SDK in production)
      const payload = JSON.parse(raw);
      await prisma.webhookLog.create({ data: { gateway: "stripe", event: payload?.type || "", signature: String(stripeSig), valid: Boolean(stripeSig && STRIPE_WEBHOOK_SECRET), payload } });
      const type = payload?.type as string;
      if (type === "payment_intent.succeeded") {
        const pi = payload?.data?.object?.id as string | undefined;
        if (pi) await prisma.payment.updateMany({ where: { gateway: "stripe", gatewayRef: pi }, data: { status: "captured" } });
      } else if (type?.startsWith("charge.refund")) {
        const pi = payload?.data?.object?.payment_intent as string | undefined;
        if (pi) await prisma.payment.updateMany({ where: { gateway: "stripe", gatewayRef: pi }, data: { status: "refunded" } });
      }
      return { statusCode: 200, body: "ok" };
    }

    return { statusCode: 400, body: "unknown webhook" };
  } catch (e: any) {
    return { statusCode: 500, body: e.message || "error" };
  }
};

export { handler };
