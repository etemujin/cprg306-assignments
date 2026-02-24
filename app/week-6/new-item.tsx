"use client";

import { useState } from "react";


interface NewItemProps {
  onAddItem: (item: { name: string; quantity: number; category: string }) => void;
}

export default function NewItem({ onAddItem }: NewItemProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");
  const [nameTouched, setNameTouched] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!name || name.length < 2) {
      alert("Please enter a valid name with at least 2 characters.");
      return;
    }
    if (typeof name !== "string") {
      alert("Name must be a string.");
      return;
    }

    const item = { name, quantity: Number(quantity), category };
    onAddItem(item);
    setName("");
    setQuantity(1);
    setCategory("produce");
    setNameTouched(false);
  };

  const isFormInvalid = !name || name.trim().length === 0;

  return (
    <div className="max-w-md mx-auto mt-10 p border-gray-200 mb-10">
      <h2 className="text-3xl font-bold mb-8 text-white-800 text-center tracking-wide">
        Add New Item
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-white-700 mb-2"
          >
          
            Item Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setNameTouched(true)}
            placeholder="Enter item name..."
            className={`w-full px-4 py-3 rounded-xl bg-gray-50 text-black border border-gray-300   ${
              nameTouched && !name
                ? "border-red-400"
                : "border-gray-300"
            } ${
            nameTouched && name && /^\d+$/.test(name)
                ? "border-red-400"
                : "border-gray-300"
            } ${
            nameTouched && name && name.length <= 2
                ? "border-red-400"
                : "border-gray-300"
            }`}
            required
          />
          {nameTouched && !name &&  (
            <p className="text-red-500 text-sm mt-1">
              Name is required.
            </p>
          )
          }
          {nameTouched && name && /^\d+$/.test(name) && (
            <p className="text-red-500 text-sm mt-1">Name cannot be only numbers.</p>
          )}
          {nameTouched && name && name.length <= 2 && (
            <p className="text-red-500 text-sm mt-1">
              Name must be at least 2 characters long.
            </p>
          )}

        </div>
        {/* Quantity Field */}
        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            max="99"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 text-black border border-gray-300"
            required
          />
        </div>

        {/* Category Field */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-black"
          >
            <option value="produce">Produce</option>
            <option value="dairy">Dairy</option>
            <option value="bakery">Bakery</option>
            <option value="meat">Meat</option>
            <option value="frozen foods">Frozen Foods</option>
            <option value="canned goods">Canned Goods</option>
            <option value="dry goods">Dry Goods</option>
            <option value="beverages">Beverages</option>
            <option value="snacks">Snacks</option>
            <option value="household">Household</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Submit Button (UNCHANGED) */}
        <button
          type="submit"
          disabled={isFormInvalid}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}
