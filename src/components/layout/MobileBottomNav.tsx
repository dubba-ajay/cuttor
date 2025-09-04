import { Home, Calendar, Users, IndianRupee, Settings, Megaphone } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function MobileBottomNav() {
  const { role } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const go = (path: string, tab?: string) => () => navigate(path, tab ? { state: { tab } } : undefined);

  const activePath = location.pathname;
  const isOwner = role === "owner";
  const isFreelancer = role === "freelancer";

  const dashboard = isOwner ? "/store-owner-dashboard" : isFreelancer ? "/freelancer-dashboard" : "/user-dashboard";

  const items = [
    { key: "home", label: "Home", icon: <Home className="w-5 h-5" />, onClick: go("/"), active: activePath === "/" },
    { key: "bookings", label: "Bookings", icon: <Calendar className="w-5 h-5" />, onClick: go(dashboard, isOwner ? "bookings" : "bookings"), active: activePath.includes("dashboard") },
    ...(isOwner || isFreelancer ? [{ key: "staff", label: "Staff", icon: <Users className="w-5 h-5" />, onClick: go(dashboard, isOwner ? "staff" : "appointments"), active: activePath.includes("dashboard") }] : []),
    ...(isOwner ? [{ key: "offers", label: "Offers", icon: <Megaphone className="w-5 h-5" />, onClick: go(dashboard, "offers"), active: activePath.includes("dashboard") }] : []),
    { key: "earnings", label: "Earnings", icon: <IndianRupee className="w-5 h-5" />, onClick: go(dashboard, isOwner ? "earnings" : "earnings"), active: activePath.includes("dashboard") },
    { key: "profile", label: "Profile", icon: <Settings className="w-5 h-5" />, onClick: go(dashboard, "settings"), active: activePath.includes("dashboard") },
  ] as const;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-5 gap-1">
        {items.slice(0,5).map((it) => (
          <button key={it.key} onClick={it.onClick} className={`flex flex-col items-center justify-center py-2 text-xs ${it.active ? "text-[#1E293B] font-semibold" : "text-gray-600"}`}>
            {it.icon}
            <span className="mt-0.5">{it.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
