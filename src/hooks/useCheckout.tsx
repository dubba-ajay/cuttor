import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { usePayments } from "@/contexts/PaymentContext";

export default function useCheckout() {
  const { createEscrow, settings, calculateSplit } = usePayments();
  const navigate = useNavigate();
  useEffect(() => {
    const handler = () => {
      const bookingId = `BKG-${Math.random().toString(36).slice(2,8).toUpperCase()}`;
      const amount = 799;
      const e = createEscrow({ bookingId, storeId: 's1', freelancerId: 'freelancer-1', amount, method: settings.gateway, serviceId: 'svc1' });
      const parts = calculateSplit(amount, 'svc1');
      navigate('/payment/success', { state: { bookingId, total: e.total, split: parts, gateway: settings.gateway } });
    };
    window.addEventListener('checkout:create', handler);
    return () => window.removeEventListener('checkout:create', handler);
  }, [createEscrow, settings, calculateSplit, navigate]);
}
