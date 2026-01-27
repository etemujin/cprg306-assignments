import ItemList from './item-list';

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <h1 className="mb-4 text-3xl font-bold tracking-tight">Shopping List</h1>
        <ItemList />
      </div>
    </main>
  );
}
