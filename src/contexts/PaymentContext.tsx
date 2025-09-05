import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { applySplit, calcTax, Escrow, EscrowStatus, Gateway, Mode, nowISO, Payout, Refund, SplitRule, uid } from "@/lib/payments";

export type GatewaySettings = {
  gateway: Gateway;
  mode: Mode;
  escrowReleaseOnCompletion: boolean;
  business: { businessName: string; gstin?: string; pan: string; defaultTaxPct: number };
  defaultSplit: SplitRule;
  perServiceSplit: Record<string, SplitRule>; // serviceId -> rule
};

export type Linking = { [freelancerId: string]: { storeId: string; approved: boolean } };

export type PaymentState = {
  settings: GatewaySettings;
  setSettings: (s: Partial<GatewaySettings>) => void;
  link: Linking;
  linkFreelancer: (freelancerId: string, storeId: string) => void;
  approveFreelancer: (freelancerId: string, approved: boolean) => void;
  // ledgers
  escrows: Escrow[];
  payouts: Payout[];
  refunds: Refund[];
  // actions
  calculateSplit: (amount: number, serviceId?: string) => { store: number; freelancer: number; platform: number; rule: SplitRule };
  createEscrow: (booking: { bookingId: string; storeId: string; freelancerId?: string; amount: number; method: string; serviceId?: string }) => Escrow;
  releaseEscrow: (bookingId: string) => { payouts: Payout[] };
  refundEscrow: (bookingId: string, amount: number, reason?: string) => Refund;
  // env status
  hasRazorpayEnv: boolean;
  hasStripeEnv: boolean;
};

const PaymentContext = createContext<PaymentState | null>(null);
export const usePayments = () => {
  const ctx = useContext(PaymentContext);
  if (!ctx) throw new Error("usePayments must be used within PaymentProvider");
  return ctx;
};

function useLocalStorage<T>(key: string, initial: T) {
  const [val, setVal] = useState<T>(() => {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) as T : initial; } catch { return initial; }
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(val)); }, [key, val]);
  return [val, setVal] as const;
}

const defaultSettings: GatewaySettings = {
  gateway: "razorpay",
  mode: "sandbox",
  escrowReleaseOnCompletion: true,
  business: { businessName: "", gstin: "", pan: "", defaultTaxPct: 18 },
  defaultSplit: { storePct: 80, freelancerPct: 10, platformPct: 10 },
  perServiceSplit: {},
};

export function PaymentProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettingsState] = useLocalStorage<GatewaySettings>("pay_settings", defaultSettings);
  const [link, setLink] = useLocalStorage<Linking>("pay_link", {});
  const [escrows, setEscrows] = useLocalStorage<Escrow[]>("pay_escrows", []);
  const [payouts, setPayouts] = useLocalStorage<Payout[]>("pay_payouts", []);
  const [refunds, setRefunds] = useLocalStorage<Refund[]>("pay_refunds", []);

  const setSettings: PaymentState["setSettings"] = (partial) => {
    const merged = { ...settings, ...partial } as GatewaySettings;
    if (partial.defaultSplit) {
      const s = partial.defaultSplit;
      const sum = Math.round(s.storePct + s.freelancerPct + s.platformPct);
      if (sum !== 100) throw new Error("Split must equal 100%");
    }
    setSettingsState(merged);
  };

  const linkFreelancer: PaymentState["linkFreelancer"] = (freelancerId, storeId) => {
    setLink(prev => ({ ...prev, [freelancerId]: { storeId, approved: prev[freelancerId]?.approved ?? false } }));
  };
  const approveFreelancer: PaymentState["approveFreelancer"] = (freelancerId, approved) => {
    setLink(prev => ({ ...prev, [freelancerId]: { ...(prev[freelancerId] || { storeId: "" }), approved } }));
  };

  const calculateSplit: PaymentState["calculateSplit"] = (amount, serviceId) => {
    const rule = serviceId && settings.perServiceSplit[serviceId] ? settings.perServiceSplit[serviceId] : settings.defaultSplit;
    const parts = applySplit(amount, rule);
    return { ...parts, rule };
  };

  const createEscrow: PaymentState["createEscrow"] = ({ bookingId, storeId, freelancerId, amount, method, serviceId }) => {
    const tax = calcTax(amount, settings.business.defaultTaxPct);
    const { rule } = calculateSplit(amount, serviceId);
    const e: Escrow = { id: uid(), bookingId, storeId, freelancerId, method, amount, tax, total: amount + tax, split: rule, status: "pending", createdAt: nowISO() };
    setEscrows(prev => [e, ...prev]);
    return e;
  };

  const releaseEscrow: PaymentState["releaseEscrow"] = (bookingId) => {
    const escrow = escrows.find(e => e.bookingId === bookingId);
    if (!escrow) throw new Error("Escrow not found");
    if (!escrow.freelancerId) throw new Error("Freelancer not linked to booking");
    const parts = applySplit(escrow.amount, escrow.split);
    const out: Payout[] = [
      { id: uid(), bookingId, payee: "store", amount: parts.store, date: nowISO() },
      { id: uid(), bookingId, payee: "freelancer", amount: parts.freelancer, date: nowISO() },
      { id: uid(), bookingId, payee: "platform", amount: parts.platform, date: nowISO() },
    ];
    setPayouts(prev => [...out, ...prev]);
    setEscrows(prev => prev.map(e => e.bookingId === bookingId ? { ...e, status: "released" as EscrowStatus } : e));
    return { payouts: out };
  };

  const refundEscrow: PaymentState["refundEscrow"] = (bookingId, amount, reason) => {
    const escrow = escrows.find(e => e.bookingId === bookingId);
    if (!escrow) throw new Error("Escrow not found");
    const r: Refund = { id: uid(), bookingId, amount, date: nowISO(), reason };
    setRefunds(prev => [r, ...prev]);
    const status: EscrowStatus = amount >= escrow.amount ? "refunded" : "partial_refunded";
    setEscrows(prev => prev.map(e => e.bookingId === bookingId ? { ...e, status } : e));
    return r;
  };

  const hasRazorpayEnv = Boolean(import.meta.env.VITE_RAZORPAY_KEY_ID && import.meta.env.VITE_RAZORPAY_KEY_SECRET && import.meta.env.VITE_RAZORPAY_WEBHOOK_SECRET);
  const hasStripeEnv = Boolean(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY && import.meta.env.VITE_STRIPE_SECRET_KEY && import.meta.env.VITE_STRIPE_WEBHOOK_SECRET);

  const value: PaymentState = {
    settings,
    setSettings,
    link,
    linkFreelancer,
    approveFreelancer,
    escrows,
    payouts,
    refunds,
    calculateSplit,
    createEscrow,
    releaseEscrow,
    refundEscrow,
    hasRazorpayEnv,
    hasStripeEnv,
  };

  return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>;
}
