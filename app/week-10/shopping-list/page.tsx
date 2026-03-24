"use client";

import { useState, useEffect } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context";
import { getItems, addItem, deleteItem } from "../services/shopping-list-service.js";


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
  const [items, setItems] = useState<ItemType[]>([]);
  const [selectedItemName, setSelectedItemName] = useState("");

  async function loadItems() {
    if (!user) return;

    const userItems = await getItems(user.uid);
    setItems(userItems);
  }

  useEffect(() => {
    loadItems();
  }, [user]);

  if (!user) {
    return null;
  }

  async function handleAddItem(newItem: Omit<ItemType, "id">) {
    const id = await addItem(user.uid, newItem);
    setItems((prev) => [...prev, { ...newItem, id }]);
  }

    async function handleDeleteItem(id: string) {
    await deleteItem(user.uid, id);
    setItems((prev) => prev.filter((item) => item.id !== id));
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
            <ItemList items={items} onItemSelect={handleItemSelect} onDeleteItem={handleDeleteItem} />
          </div>

          <div className="w-full lg:w-1/2">
            <MealIdeas ingredient={selectedItemName} />
          </div>
        </div>
      </div>
    </main>
  );
}