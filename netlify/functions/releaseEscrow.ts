import type { Handler } from "@netlify/functions";
import { prisma } from "./_prisma";
import { calculateSplit } from "../../src/server/split";

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
  const adminKey = process.env.ADMIN_API_KEY || process.env.VITE_ADMIN_API_KEY;
  const provided = event.headers["x-admin-key"] || event.headers["X-Admin-Key"];
  if (!adminKey || provided !== adminKey) return { statusCode: 401, body: "unauthorized" } as any;
  try {
    const { paymentId } = JSON.parse(event.body || "{}");
    if (!paymentId) return { statusCode: 400, body: "paymentId required" };
    const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
    if (!payment) return { statusCode: 404, body: "payment not found" };
    const esc = await prisma.escrow.findUnique({ where: { paymentId } });
    if (!esc || esc.status !== "pending") return { statusCode: 400, body: "escrow not pending" };
    const split = await calculateSplit(payment.amount, { storeId: payment.storeId, freelancerId: payment.freelancerId || undefined });
    const items = [
      { payeeType: "store", amount: split.store },
      { payeeType: "freelancer", amount: split.freelancer },
      { payeeType: "platform", amount: split.platform },
    ];
    for (const it of items) {
      await prisma.payout.create({ data: { paymentId, payeeType: it.payeeType, amount: it.amount, status: "pending" } });
    }
    await prisma.escrow.update({ where: { paymentId }, data: { status: "released" } });
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (e: any) {
    return { statusCode: 500, body: e.message || "error" };
  }
};

export { handler };
