import { hasSupabaseEnv, getSupabase } from "@/lib/supabase";

export type BookingRecord = {
  id: string;
  salonId: number;
  salonName: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "9:30 AM"
  location: "salon" | "home";
  services: string[];
  status: "confirmed" | "cancelled";
};

const slotKey = (salonId: number, date: string) => `bookings:${salonId}:${date}`;
const myKey = () => `myBookings`;

const safeJSON = (s: string | null) => {
  try { return s ? JSON.parse(s) : undefined; } catch { return undefined; }
};

export async function listBookedSlots(salonId: number, date: string): Promise<string[]> {
  if (hasSupabaseEnv) {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("bookings")
        .select("time,status")
        .eq("salon_id", salonId)
        .eq("date", date)
        .in("status", ["confirmed"]) ;
      if (!error && data) return data.map((r: any) => r.time);
    } catch {}
  }
  const arr = safeJSON(localStorage.getItem(slotKey(salonId, date))) as string[] | undefined;
  return Array.isArray(arr) ? arr : [];
}

export async function bookSlot(rec: Omit<BookingRecord, "id" | "status">): Promise<BookingRecord> {
  const id = `${rec.salonId}-${rec.date}-${rec.time}`;
  const full: BookingRecord = { ...rec, id, status: "confirmed" };

  if (hasSupabaseEnv) {
    try {
      const supabase = getSupabase();
      await supabase.from("bookings").insert({
        id,
        salon_id: rec.salonId,
        salon_name: rec.salonName,
        date: rec.date,
        time: rec.time,
        location: rec.location,
        services: rec.services,
        status: "confirmed",
      });
    } catch {}
  }

  // local fallback list per date
  const key = slotKey(rec.salonId, rec.date);
  const current = (safeJSON(localStorage.getItem(key)) as string[] | undefined) || [];
  if (!current.includes(rec.time)) localStorage.setItem(key, JSON.stringify([...current, rec.time]));

  // my bookings list
  const mineKey = myKey();
  const mine = (safeJSON(localStorage.getItem(mineKey)) as BookingRecord[] | undefined) || [];
  localStorage.setItem(mineKey, JSON.stringify([full, ...mine]));
  return full;
}

export async function cancelSlot(recordId: string) {
  // remove from supabase
  if (hasSupabaseEnv) {
    try {
      const supabase = getSupabase();
      await supabase.from("bookings").update({ status: "cancelled" }).eq("id", recordId);
    } catch {}
  }
  // remove from local day list
  const parts = recordId.split("-");
  const salonId = Number(parts[0]);
  const date = parts.slice(1, 4).join("-"); // YYYY-MM-DD may be split
  const time = parts.slice(4).join("-") || parts[3];
  const key = slotKey(salonId, date);
  const current = (safeJSON(localStorage.getItem(key)) as string[] | undefined) || [];
  localStorage.setItem(key, JSON.stringify(current.filter((t) => t !== time)));
  // remove from my bookings
  const mineKey = myKey();
  const mine = (safeJSON(localStorage.getItem(mineKey)) as BookingRecord[] | undefined) || [];
  localStorage.setItem(mineKey, JSON.stringify(mine.filter((b) => b.id !== recordId)));
}

export function getMyBookings(): BookingRecord[] {
  const mine = (safeJSON(localStorage.getItem(myKey())) as BookingRecord[] | undefined) || [];
  return mine;
}
