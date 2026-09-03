'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import TaskNotFound from './TaskNotFound';

type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
};

export default function TaskDetailCard({ taskId }: { taskId: string }) {
  const [task, setTask] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTodos = localStorage.getItem('TODO_LIST_CACHE');
    
    if (savedTodos) {
      const parsedTodos: Todo[] = JSON.parse(savedTodos);
      const foundTask = parsedTodos.find(t => t.id.toString() === taskId);
      
      if (foundTask) {
        setTask(foundTask);
      }
    }
    setIsLoading(false);
  }, [taskId]);

  if (isLoading) {
    return <div className="text-center py-10 text-gray-500">Memuat detail tugas...</div>;
  }

  if (!task) {
    return <TaskNotFound />;
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Detail Tugas</h1>
        <Link href="/cached" className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors">
          &larr; Kembali ke Daftar
        </Link>
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">ID Tugas</h3>
          <p className="text-gray-900">#{task.id}</p>
        </div>
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Judul Tugas</h3>
          <p className="text-xl font-bold text-gray-900">{task.title}</p>
        </div>
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Deskripsi</h3>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-gray-700">{task.description}</p>
          </div>
        </div>
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</h3>
          {task.completed ? (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
              ✓ Selesai
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
              Pending
            </span>
          )}
        </div>
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tanggal Dibuat</h3>
          <p className="text-gray-700">{task.createdAt}</p>
        </div>
      </div>
    </div>
  );
}