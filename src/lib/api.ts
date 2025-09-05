export function getApiBase() {
  const base = import.meta.env.VITE_API_BASE || "/.netlify/functions";
  return base.replace(/\/$/, "");
}

export async function apiFetch(path: string, init?: RequestInit & { adminKey?: string }) {
  const base = getApiBase();
  const { adminKey, headers, ...rest } = init || {};
  const h: Record<string, string> = { "Content-Type": "application/json", ...(headers as any) };
  if (adminKey) h["x-admin-key"] = adminKey;
  const res = await fetch(`${base}${path.startsWith("/") ? path : "/" + path}`, { ...rest, headers: h });
  if (!res.ok) throw new Error(await res.text());
  return res;
}
