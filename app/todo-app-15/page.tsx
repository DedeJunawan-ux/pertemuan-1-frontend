import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import TodoList from "../components/TodoList";

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">Aplikasi Todo List</h1>
     
      <TodoForm />
     
      <TodoList />

    </div>
  );
}