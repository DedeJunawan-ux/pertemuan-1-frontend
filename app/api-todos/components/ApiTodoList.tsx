'use client';

import React, { useState } from 'react';
import { TaskItem } from '../../types/api-todo';
import { todoService } from '../../../services/todoService';

interface ApiTodoListProps {
  initialTasks: TaskItem[];
}

export default function ApiTodoList({ initialTasks }: ApiTodoListProps) {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);

  const handleToggleTask = async (id: number, currentCompleted: boolean) => {
    const targetStatus = !currentCompleted;

    // 1. Optimistic Update di State Lokal
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: targetStatus } : t))
    );

    // 2. Simulasi Update ke Dummy JSON via todoService
    try {
      await todoService.updateTodoStatus(id, targetStatus);
    } catch (err) {
      console.warn('Simulasi update ke API DummyJSON gagal (fallback state):', err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Daftar Tugas</h2>
        <span className="text-xs bg-gray-200 text-gray-600 px-2.5 py-1 rounded-full font-medium">
          {tasks.length} item
        </span>
      </div>
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-500 text-sm">Tidak ada tugas.</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => handleToggleTask(task.id, task.completed)}
              className={`group flex items-start sm:items-center justify-between p-4 rounded-xl border transition-all cursor-pointer select-none ${
                task.completed
                  ? 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-300'
                  : 'bg-white border-gray-100 hover:border-blue-300'
              }`}
            >
              <div className="flex items-start sm:items-center gap-3.5 flex-1 pr-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  readOnly
                  className="mt-0.5 sm:mt-0 h-5 w-5 shrink-0 cursor-pointer accent-blue-600"
                />
                <div>
                  <p
                    className={`text-sm font-medium leading-relaxed transition-all ${
                      task.completed
                        ? 'line-through text-gray-400'
                        : 'text-gray-700 group-hover:text-blue-600'
                    }`}
                  >
                    {task.title}
                  </p>
                  <p className="text-[10px] text-gray-400 sm:hidden mt-1">
                    ID #{task.id} • User #{task.userId}
                  </p>
                </div>
              </div>

              {/* Badges on right (desktop) */}
              <div className="hidden sm:flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-bold px-2 py-1 bg-purple-100 text-purple-600 rounded">
                  ID: #{task.id}
                </span>
                <span className="text-[10px] font-bold px-2 py-1 bg-blue-100 text-blue-600 rounded">
                  User: {task.userId}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-1 rounded ${
                    task.completed
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-yellow-100 text-yellow-600'
                  }`}
                >
                  {task.completed ? 'Selesai' : 'Pending'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}