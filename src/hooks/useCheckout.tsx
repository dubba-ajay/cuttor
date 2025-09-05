import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { usePayments } from "@/contexts/PaymentContext";
import { GatewayService } from "@/lib/gateway";

export default function useCheckout() {
  const { createEscrow, settings, calculateSplit } = usePayments();
  const navigate = useNavigate();
  useEffect(() => {
    const handler = async () => {
      const bookingId = `BKG-${Math.random().toString(36).slice(2,8).toUpperCase()}`;
      const amount = 799; // ₹
      try {
        const apiBase = import.meta.env.VITE_API_BASE || '';
        if (apiBase) {
          const res = await fetch(`${apiBase}/createCheckout`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount, currency: 'INR', bookingId, storeId: 's1', freelancerId: 'freelancer-1', serviceId: 'svc1', gateway: settings.gateway }) });
          if (!res.ok) throw new Error(await res.text());
          const data = await res.json();
          const e = createEscrow({ bookingId, storeId: 's1', freelancerId: 'freelancer-1', amount, method: settings.gateway, serviceId: 'svc1' });
          const parts = calculateSplit(amount, 'svc1');
          navigate('/payment/success', { state: { bookingId, total: e.total, split: parts, gateway: settings.gateway, orderId: data.orderId || data.paymentIntentId, paymentId: data.paymentId, status: 'created' } });
          return;
        }
        const order = settings.gateway === 'razorpay'
          ? await GatewayService.createOrderRazorpay({ amount: amount * 100, currency: 'INR', receipt: bookingId }, settings.mode)
          : await GatewayService.createPaymentIntentStripe({ amount: amount * 100, currency: 'INR', receipt: bookingId }, settings.mode);
        const e = createEscrow({ bookingId, storeId: 's1', freelancerId: 'freelancer-1', amount, method: settings.gateway, serviceId: 'svc1' });
        const parts = calculateSplit(amount, 'svc1');
        navigate('/payment/success', { state: { bookingId, total: e.total, split: parts, gateway: settings.gateway, orderId: order.id, status: order.status } });
      } catch (err:any) {
        console.error(err);
        navigate('/payment/failed', { state: { bookingId, error: err.message || 'Payment initiation failed' } });
      }
    };
    window.addEventListener('checkout:create', handler);
    return () => window.removeEventListener('checkout:create', handler);
  }, [createEscrow, settings, calculateSplit, navigate]);
}
