import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { allStores } from "@/components/features/AllStores";

interface Props {
  open: boolean;
  onOpenChange(open: boolean): void;
}

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

export default function HeaderSearch({ open, onOpenChange }: Props) {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search stores by name, service, or area..."
        value={value}
        onValueChange={setValue}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Stores">
          {allStores.map((store) => (
            <CommandItem
              key={store.id}
              onSelect={() => { onOpenChange(false); navigate(linkForStore(store)); }}
              value={`${store.name} ${store.address} ${store.category} ${store.description} ${store.specialties.join(" ")}`}
            >
              <div className="flex items-center justify-between w-full">
                <div>
                  <div className="font-medium">{store.name}</div>
                  <div className="text-xs text-muted-foreground">{store.address}</div>
                </div>
                <Badge variant="outline" className="ml-2 whitespace-nowrap">{categoryLabel(store.category)}</Badge>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
