import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { allStores } from "@/components/features/AllStores";

interface Props { open: boolean; onOpenChange(open: boolean): void; }

const categoryLabel = (c: string) => {
  switch (c) {
    case "mens-hair": return "Men's Hair";
    case "womens-beauty": return "Women's Beauty";
    case "nail-studios": return "Nail Studios";
    case "makeup-artists": return "Makeup Artists";
    default: return "Store";
  }
};

const linkForStore = (store: { id: number; category: string }) => {
  switch (store.category) {
    case "mens-hair": return `/salon/${store.id}`;
    case "womens-beauty": return `/womens-beauty/salon/${store.id}`;
    case "nail-studios": return `/nail-studios/salon/${store.id}`;
    case "makeup-artists": return `/makeup-artists/salon/${store.id}`;
    default: return `/salon/${store.id}`;
  }
};

export default function SimpleSearchDialog({ open, onOpenChange }: Props) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => { if (!open) setQuery(""); }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as typeof allStores;
    return allStores.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.address.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.specialties.some(x => x.toLowerCase().includes(q))
    ).slice(0, 10);
  }, [query]);

  const go = (id: number, category: string) => {
    onOpenChange(false);
    navigate(linkForStore({ id, category }));
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' && results[0]) {
      go(results[0].id, results[0].category);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden">
        <div className="border-b p-3">
          <Input
            autoFocus
            placeholder="Search stores by name, service, or area..."
            value={query}
            onChange={(e)=> setQuery(e.target.value)}
            onKeyDown={onKeyDown}
          />
        </div>
        <div className="max-h-80 overflow-auto">
          {query && results.length === 0 && (
            <div className="p-3 text-sm text-muted-foreground">No results found.</div>
          )}
          {results.map(s => (
            <button key={s.id} className="w-full text-left px-3 py-2 hover:bg-accent" onClick={()=> go(s.id, s.category)}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.address}</div>
                </div>
                <Badge variant="outline">{categoryLabel(s.category)}</Badge>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
