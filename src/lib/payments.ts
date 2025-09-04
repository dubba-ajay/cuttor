export type Gateway = "razorpay" | "stripe";
export type Mode = "sandbox" | "live";

export type SplitRule = { storePct: number; freelancerPct: number; platformPct: number };
export type BusinessInfo = { businessName: string; gstin?: string; pan: string; defaultTaxPct: number };

export type EscrowStatus = "pending" | "released" | "refunded" | "partial_refunded";
export type Payout = { id: string; bookingId: string; payee: "store" | "freelancer" | "platform"; amount: number; date: string };
export type Escrow = { id: string; bookingId: string; storeId: string; freelancerId?: string; method: string; amount: number; tax: number; total: number; split: SplitRule; status: EscrowStatus; createdAt: string };
export type Refund = { id: string; bookingId: string; amount: number; date: string; reason?: string };

export function validateSplit(rule: SplitRule) {
  const s = rule.storePct + rule.freelancerPct + rule.platformPct;
  if (Math.round(s) !== 100) throw new Error("Split percentages must sum to 100%");
  if (rule.storePct < 0 || rule.freelancerPct < 0 || rule.platformPct < 0) throw new Error("Split cannot be negative");
}

export function calcTax(amount: number, pct: number) {
  return Math.round((amount * pct) / 100);
}

export function applySplit(amount: number, rule: SplitRule) {
  validateSplit(rule);
  const store = Math.round((amount * rule.storePct) / 100);
  const freelancer = Math.round((amount * rule.freelancerPct) / 100);
  const platform = amount - store - freelancer; // ensure sum
  return { store, freelancer, platform };
}

export const nowISO = () => new Date().toISOString();
export const uid = () => Math.random().toString(36).slice(2, 10);
