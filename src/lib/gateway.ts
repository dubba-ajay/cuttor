import type { Mode } from "./payments";

export type CreateOrderInput = {
  amount: number; // in smallest currency unit (e.g., paise)
  currency: "INR" | "USD";
  receipt?: string;
  notes?: Record<string, string>;
};

export type CreateOrderResult = { id: string; amount: number; currency: string; status: "created" | "requires_action" | "succeeded" };

export class GatewayService {
  static async createOrderRazorpay(input: CreateOrderInput, mode: Mode): Promise<CreateOrderResult> {
    if (mode === "sandbox") {
      // Simulate Razorpay order creation in sandbox
      const id = `order_${Math.random().toString(36).slice(2, 12)}`;
      return { id, amount: input.amount, currency: input.currency, status: "created" };
    }
    // Live mode requires a secure server. Do not attempt from client.
    throw new Error("Razorpay live mode requires a server-side function. Connect hosting (e.g., Netlify) and add a secure API route.");
  }

  static async createPaymentIntentStripe(input: CreateOrderInput, mode: Mode): Promise<CreateOrderResult> {
    if (mode === "sandbox") {
      // Simulate Stripe PaymentIntent in sandbox
      const id = `pi_${Math.random().toString(36).slice(2, 12)}`;
      return { id, amount: input.amount, currency: input.currency, status: "requires_action" };
    }
    // Live mode requires a secure server. Do not attempt from client.
    throw new Error("Stripe live mode requires a server-side function. Connect hosting (e.g., Netlify) and add a secure API route.");
  }
}
