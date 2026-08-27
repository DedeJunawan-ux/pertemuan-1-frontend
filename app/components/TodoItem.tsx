export default function TodoItem() {
  return (
    <li className="flex justify-between items-center p-3 border-b border-gray-200 hover:bg-gray-50 text-black">
      <span>Menyelesaikan Modul PWF Tugas 2</span>
      <button className="text-red-500 hover:text-red-700 text-sm font-semibold">
        Hapus
      </button>
    </li>
  );
}