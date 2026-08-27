import TodoItem from "./TodoItem";

export default function TodoList() {
  return (
    <div className="border rounded p-4 shadow-sm bg-white">
      <h3 className="font-bold mb-4 text-lg text-black">Daftar Tugas</h3>
      <ul>
        {/* Memanggil komponen item beberapa kali sebagai contoh */}
        <TodoItem />
        <TodoItem />
        <TodoItem />
      </ul>
    </div>
  );
}