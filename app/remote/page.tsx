'use client';

import React, { useEffect, useState } from 'react';
import { ApiResponse, TaskItem } from '../types/api-todo';

export default function RemoteTodosPage() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
     
        const response = await fetch('/api/todos?limit=10');
        if (!response.ok) throw new Error('Gagal mengambil data dari server');
        
        const result: ApiResponse<{ tasks: TaskItem[] }> = await response.json();
        
        if (result.success && result.data) {
          setTasks(result.data.tasks);
        } else {
          setError(result.message || 'Terjadi kesalahan sistem');
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

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

          {/* Indikator Loading */}
          {loading && (
            <div className="flex justify-center items-center py-10">
              <span className="text-blue-600 font-medium animate-pulse">
                Memuat data dari server...
              </span>
            </div>
          )}

          {/* Indikator Error */}
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg text-center font-medium mb-4">
              {error}
            </div>
          )}
          
          {/* List Data Tugas */}
          {!loading && !error && (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li 
                  key={task.id} 
                  className={`p-4 rounded-xl border flex items-center justify-between gap-3 transition-all duration-200 ${
                    task.completed 
                      ? 'bg-emerald-50/50 border-emerald-200' 
                      : 'bg-white border-gray-100 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <input 
                      type="checkbox" 
                      checked={task.completed} 
                      readOnly 
                      className="w-5 h-5 rounded text-blue-600 cursor-default" 
                    />
                    <span className={`text-base font-medium truncate ${
                      task.completed ? 'line-through text-gray-400' : 'text-gray-700'
                    }`}>
                      {task.title}
                    </span>
                  </div>
                  <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-gray-100 text-gray-500 rounded">
                    User: {task.userId}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}