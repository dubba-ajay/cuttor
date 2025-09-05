import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function MobileSearchBar(){
  const [q, setQ] = useState("");

  return (
    <div className="w-full">
      <div className="rounded-2xl border bg-white p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              value={q}
              onChange={(e)=> setQ(e.target.value)}
              placeholder="Search stores, salons, or home services"
              className="pl-9 h-11 rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
