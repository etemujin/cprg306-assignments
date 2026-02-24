"use client";
import NewItemForm from "./new-item";
export default function Week4Page() {
  const handleAddItem = (item: { name: string; quantity: number; category: string }) => {
    console.log("New item added:", item);
  };

  return (
    <div className="ml-20 mt-30">
      <NewItemForm onAddItem={handleAddItem} />
    </div>
  );
}