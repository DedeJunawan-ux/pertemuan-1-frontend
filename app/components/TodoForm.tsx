"use client";

export default function TodoForm() {
  return (
    <div className="mb-6 p-4 border rounded shadow-sm">
      <h3 className="font-bold mb-3 text-lg">Tambah Tugas Baru</h3>
      <div className="flex gap-2">
        <input 
          type="text" 
          placeholder="Ketik tugas di sini..." 
          className="border p-2 flex-grow rounded text-black" 
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium">
          Tambah
        </button>
      </div>
    </div>
  );
}