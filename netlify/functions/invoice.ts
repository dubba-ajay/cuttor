import type { Handler } from "@netlify/functions";
import { prisma } from "./_prisma";
import PDFDocument from "pdfkit";

const handler: Handler = async (event) => {
  if (event.httpMethod !== "GET") return { statusCode: 405, body: "Method Not Allowed" };
  try {
    const paymentId = (event.queryStringParameters || {}).paymentId;
    if (!paymentId) return { statusCode: 400, body: "paymentId required" };
    const p = await prisma.payment.findUnique({ where: { id: paymentId } });
    if (!p) return { statusCode: 404, body: "payment not found" };

    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks: Buffer[] = [];
    doc.on("data", (c) => chunks.push(c as Buffer));
    const done = new Promise<Buffer>((resolve) => {
      doc.on("end", () => resolve(Buffer.concat(chunks)));
    });

    doc.fontSize(18).text("Invoice", { align: "right" });
    doc.moveDown();
    doc.fontSize(12).text(`Payment ID: ${p.id}`);
    doc.text(`Booking ID: ${p.bookingId}`);
    doc.text(`Gateway: ${p.gateway}`);
    doc.text(`Currency: ${p.currency}`);
    doc.moveDown();
    doc.text(`Amount: ${p.amount}`);
    doc.text(`Tax: ${p.tax}`);
    doc.text(`Total: ${p.total}`);
    doc.end();

    const buf = await done;
    return { statusCode: 200, headers: { "Content-Type": "application/pdf" }, isBase64Encoded: true, body: buf.toString("base64") } as any;
  } catch (e: any) {
    return { statusCode: 500, body: e.message || "error" };
  }
};

export { handler };
