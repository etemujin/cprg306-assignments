"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import ItemsData from "./items.json";

export default function Page() {
  const [items, setItems] = useState(ItemsData);

  function handleAddItem(newItem: any) {
    setItems((prev) => [...prev, newItem]);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <h1 className="mb-4 text-3xl font-bold tracking-tight">Shopping List</h1>

        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} />
      </div>
    </main>
  );
}