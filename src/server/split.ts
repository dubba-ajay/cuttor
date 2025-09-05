import { prisma } from "../../netlify/functions/_prisma";

export type Split = { store: number; freelancer: number; platform: number; rule: { storePct: number; freelancerPct: number; platformPct: number } };

export async function calculateSplit(amount: number, params: { storeId: string; serviceId?: string; freelancerId?: string }): Promise<Split> {
  const rules = await prisma.commissionRule.findMany({ where: { active: true } });
  // Determine best match priority: service > freelancer > store > global (by priority then specificity)
  const candidates = rules
    .map(r => ({
      r,
      score:
        (params.serviceId && r.scopeType === "service" && r.scopeId === params.serviceId ? 1000 : 0) +
        (params.freelancerId && r.scopeType === "freelancer" && r.scopeId === params.freelancerId ? 500 : 0) +
        (r.scopeType === "store" && r.scopeId === params.storeId ? 200 : 0) +
        (r.scopeType === "global" && r.scopeId == null ? 100 : 0) +
        r.priority,
    }))
    .sort((a, b) => b.score - a.score);
  const top = candidates[0]?.r;
  const rule = top ? { storePct: top.storePct, freelancerPct: top.freelancerPct, platformPct: top.platformPct } : { storePct: 80, freelancerPct: 10, platformPct: 10 };
  const s = Math.round(rule.storePct + rule.freelancerPct + rule.platformPct);
  if (s !== 100) throw new Error("Commission rule invalid: sum must equal 100%");
  const store = Math.round((amount * rule.storePct) / 100);
  const freelancer = Math.round((amount * rule.freelancerPct) / 100);
  const platform = amount - store - freelancer;
  return { store, freelancer, platform, rule };
}
