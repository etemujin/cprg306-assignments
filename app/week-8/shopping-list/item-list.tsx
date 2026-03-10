"use client";

import { useMemo, useState } from "react";
import Item from "./item";

type ItemType = {
  id?: string;
  name: string;
  quantity: number;
  category: string;
};

type ItemListProps = {
  items: ItemType[];
  onItemSelect: (item: ItemType) => void;
};

type SortMode = "name" | "category" | "group";

export default function ItemList({ items, onItemSelect }: ItemListProps) {
  const [sortBy, setSortBy] = useState<SortMode>("name");

  const sortedItems = useMemo(() => {
    const copy = [...items];
    copy.sort((a, b) => {
      if (sortBy === "category") {
        const c = a.category.localeCompare(b.category);
        return c !== 0 ? c : a.name.localeCompare(b.name);
      }
      return a.name.localeCompare(b.name);
    });
    return copy;
  }, [items, sortBy]);

  const grouped = useMemo(() => {
    const groups = items.reduce((acc, it) => {
      const key = it.category;
      acc[key] ??= [];
      acc[key].push(it);
      return acc;
    }, {} as Record<string, ItemType[]>);

    const categories = Object.keys(groups).sort((a, b) => a.localeCompare(b));
    for (const cat of categories) groups[cat].sort((a, b) => a.name.localeCompare(b.name));

    return { groups, categories };
  }, [items]);

  const baseBtn =
    "px-4 py-2 rounded-xl text-sm font-semibold transition active:scale-[0.98]";
  const activeBtn = "ring-2 ring-white/30 bg-white/15 text-white";
  const idleBtn = "bg-white/10 text-white/90 hover:bg-white/15";

  return (
    <section className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 shadow-xl p-6">
      <header className="mb-5">
        <h1 className="text-3xl font-bold tracking-tight">Shopping List</h1>
        <p className="text-white/70 mt-1 text-sm">
          View:{" "}
          <span className="font-semibold text-white">
            {sortBy === "group" ? "grouped" : sortBy}
          </span>
        </p>
      </header>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setSortBy("name")}
          className={`${baseBtn} ${sortBy === "name" ? activeBtn : idleBtn}`}
        >
          Sort by Name
        </button>

        <button
          onClick={() => setSortBy("category")}
          className={`${baseBtn} ${sortBy === "category" ? activeBtn : idleBtn}`}
        >
          Sort by Category
        </button>

        <button
          onClick={() => setSortBy("group")}
          className={`${baseBtn} ${sortBy === "group" ? activeBtn : idleBtn}`}
        >
          Group by Category
        </button>
      </div>

      {sortBy === "group" ? (
        <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4">
          {grouped.categories.map((cat) => (
            <div key={cat} className="mt-6 first:mt-0">
              <h2 className="text-lg font-bold capitalize">{cat}</h2>

              <ul className="mt-2 divide-y divide-white/10 rounded-xl border border-white/10 overflow-hidden">
                {grouped.groups[cat].map((it, idx) => (
                  <div key={it.id ?? `${it.name}-${idx}`} onClick={() => onItemSelect(it)} className="cursor-pointer">
                    <Item
                      name={it.name}
                      quantity={it.quantity}
                      category={it.category}
                    />
                  </div>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul className="mt-5 divide-y divide-white/10 rounded-xl border border-white/10 overflow-hidden">
          {sortedItems.map((it, idx) => (
            <div key={it.id ?? `${it.name}-${idx}`} onClick={() => onItemSelect(it)} className="cursor-pointer">
              <Item
                name={it.name}
                quantity={it.quantity}
                category={it.category}
              />
            </div>
          ))}
        </ul>
      )}
    </section>
  );
}