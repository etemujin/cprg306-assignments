"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import ItemsData from "./items.json";
import { useUserAuth } from "../_utils/auth-context";



type ItemType = {
  id?: string;
  name: string;
  quantity: number;
  category: string;
};

const EMOJI_REGEX = /[\u{2600}-\u{27BF}\u{1F000}-\u{1FAFF}]/gu;

function cleanIngredientName(name: string) {

  let cleaned = name.split(",")[0].trim();

  cleaned = cleaned.replace(EMOJI_REGEX, "").trim();

  cleaned = cleaned.toLowerCase();

  return cleaned;
}

export default function Page() {
  const { user } = useUserAuth();
  const [items, setItems] = useState<ItemType[]>(ItemsData as ItemType[]);
  const [selectedItemName, setSelectedItemName] = useState("");

  if (!user) { 
    return null;
  }

  function handleAddItem(newItem: Omit<ItemType, "id">) {
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    setItems((prev) => [...prev, { ...newItem, id }]);
  }

  function handleItemSelect(item: ItemType) {
    const cleaned = cleanIngredientName(item.name);
    setSelectedItemName(cleaned);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold tracking-tight">Shopping List</h1>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <NewItem onAddItem={handleAddItem} />
            <ItemList items={items} onItemSelect={handleItemSelect} />
          </div>

          <div className="w-full lg:w-1/2">
            <MealIdeas ingredient={selectedItemName} />
          </div>
        </div>
      </div>
    </main>
  );
}