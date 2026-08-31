import React from 'react';
import ApiTodoList from './components/ApiTodoList';
import { getTasks } from '../../lib/tasks';
// Tambahan: Import TaskItem agar TypeScript mengenali tipe datanya
import { TaskItem } from '../types/api-todo';

export default async function ApiTodosPage() {
  // Tambahan: Mendeklarasikan bahwa array ini berisi TaskItem
  let initialTasks: TaskItem[] = []; 
  
  try {
    const result = await getTasks({ limit: 10, skip: 0 });
    initialTasks = result.tasks;
  } catch (error) {
    console.error("Gagal mengambil data:", error);
  }

  return (
    <main className="min-h-screen p-6 md:p-10 bg-white text-gray-800">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
          <header className="mb-6 border-b border-gray-100 pb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-center">
              Daftar Tugas (API Data)
            </h1>
            <p className="text-center text-sm text-gray-500 mt-2">
              Data diambil secara live dari eksternal DummyJSON API
            </p>
          </header>
          
          <ApiTodoList initialTasks={initialTasks} />
        </div>
      </div>
    </main>
  );
}