import type { Handler } from "@netlify/functions";
import { prisma } from "./_prisma";

const handler: Handler = async (event) => {
  const method = event.httpMethod;
  const adminKey = process.env.ADMIN_API_KEY || process.env.VITE_ADMIN_API_KEY;
  const provided = event.headers["x-admin-key"] || event.headers["X-Admin-Key"];
  if (!adminKey || provided !== adminKey) return { statusCode: 401, body: "unauthorized" } as any;
  try {
    if (method === "GET") {
      const list = await prisma.commissionRule.findMany({ orderBy: { priority: "desc" } });
      return { statusCode: 200, body: JSON.stringify(list) };
    } else if (method === "POST") {
      const body = JSON.parse(event.body || "{}");
      const created = await prisma.commissionRule.create({ data: body });
      return { statusCode: 200, body: JSON.stringify(created) };
    } else if (method === "PUT") {
      const body = JSON.parse(event.body || "{}");
      const updated = await prisma.commissionRule.update({ where: { id: body.id }, data: body });
      return { statusCode: 200, body: JSON.stringify(updated) };
    } else if (method === "DELETE") {
      const id = (event.queryStringParameters || {}).id;
      if (!id) return { statusCode: 400, body: "id required" };
      await prisma.commissionRule.delete({ where: { id } });
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }
    return { statusCode: 405, body: "Method Not Allowed" };
  } catch (e: any) {
    return { statusCode: 500, body: e.message || "error" };
  }
};

export { handler };
