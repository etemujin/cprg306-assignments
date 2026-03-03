"use client";

interface ItemProps {
  name: string;
  quantity: number;
  category: string;
  onSelect?: () => void;
}

export default function Item({ name, quantity, category, onSelect }: ItemProps) {
  return (
    <li
      onClick={onSelect}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.();
        }
      }}
      className="px-4 py-3 flex items-center justify-between hover:bg-white/5 transition cursor-pointer outline-none focus:ring-2 focus:ring-white/30"
    >
      <div className="min-w-0">
        <p className="font-semibold truncate">{name}</p>
        <p className="text-xs text-white/60">
          Category: <span className="capitalize">{category}</span>
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 border border-white/10">
          Qty {quantity}
        </span>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 border border-white/10 capitalize">
          {category}
        </span>
      </div>
    </li>
  );
}