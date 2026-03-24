"use client";

import { useEffect, useState } from "react";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

async function fetchMealIdeas(ingredient: string): Promise<Meal[]> {
  const ing = ingredient?.trim();
  if (!ing) return [];

  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
    ing
  )}`;

  const res = await fetch(url);
  if (!res.ok) return [];

  const data = (await res.json()) as { meals: Meal[] | null };
  return data.meals ?? [];
}

export default function MealIdeas({ ingredient }: { ingredient: string }) {
  const [meals, setMeals] = useState<Meal[]>([]);

  async function loadMealIdeas() {
    const result = await fetchMealIdeas(ingredient);
    setMeals(result);
  }

  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  return (
    <section className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 shadow-xl p-6">
      <header className="mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Meal Ideas</h2>
        {ingredient ? (
          <p className="text-white/70 mt-1 text-sm">
            Based on: <span className="font-semibold text-white">{ingredient}</span>
          </p>
        ) : (
          <p className="text-white/70 mt-1 text-sm">Click an item to see meal ideas.</p>
        )}
      </header>

      {ingredient && meals.length === 0 ? (
        <p className="text-white/70 text-sm">No meals found for that ingredient.</p>
      ) : null}

      <ul className="space-y-2">
        {meals.map((m) => (
          <li
            key={m.idMeal}
            className="rounded-xl border border-white/10 bg-black/20 px-4 py-3"
          >
            <p className="font-semibold">{m.strMeal}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}