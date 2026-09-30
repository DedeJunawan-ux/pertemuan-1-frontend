'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { authService } from '@/services/authService';
import { todoService } from '@/services/todoService';
import { ApiError } from '@/services/api';
import { Todo } from '@/types/todo';

export default function TodoApp() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Auth Guard & Pemuatan Data Awal dari Backend
  useEffect(() => {
    const token = authService.getToken();
    if (!token) {
      router.replace('/login');
      return;
    }

    const loadTodos = async () => {
      try {
        setLoading(true);
        const data = await todoService.getTodos();
        const formatted: Todo[] = data.map((item) => ({
          id: item.id,
          title: item.todo,
          completed: Boolean(item.completed),
          createdAt: new Date().toISOString().split('T')[0],
        }));
        setTodos(formatted);
      } catch (err) {
        if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
          authService.logout();
          router.replace('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, [router]);

  // 2. Handler Tambah Tugas Baru (POST /api/todos)
  const handleAddTodo = async (title: string) => {
    try {
      const created = await todoService.createTodo(title);
      const newTodo: Todo = {
        id: created.id,
        title: created.todo,
        completed: Boolean(created.completed),
        createdAt: new Date().toISOString().split('T')[0],
      };
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
      alert(`Gagal menambah tugas: ${message}`);
    }
  };

  // 3. Handler Checklist / Ubah Status Selesai (PUT /api/todos/:id)
  const handleToggleTodo = async (id: number) => {
    const target = todos.find((t) => t.id === id);
    if (!target) return;

    const nextCompleted = !target.completed;
    // Pembaruan UI langsung (Optimistic)
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: nextCompleted } : t))
    );

    try {
      await todoService.updateTodo(id, { is_completed: nextCompleted });
    } catch (err) {
      // Kembalikan status jika gagal
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: target.completed } : t))
      );
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
      alert(`Gagal memperbarui tugas: ${message}`);
    }
  };

  // 4. Handler Hapus Tugas (DELETE /api/todos/:id)
  const handleDeleteTodo = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus tugas ini?')) return;

    try {
      await todoService.deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
      alert(`Gagal menghapus tugas: ${message}`);
    }
  };

  // 5. Handler Logout
  const handleLogout = () => {
    authService.logout();
    router.replace('/login');
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-400 text-sm">Memuat daftar tugas...</p>
      </div>
    );
  }

  return (
    <div>
      <TodoForm onAddTodo={handleAddTodo} />

      {todos.length === 0 ? (
        <div className="text-center py-12 border-t border-b border-gray-100 my-4">
          <p className="text-gray-500 font-medium text-sm">Belum ada tugas</p>
          <p className="text-gray-400 text-xs mt-1">
            Tambahkan tugas baru untuk memulai aktivitas.
          </p>
        </div>
      ) : (
        <TodoList
          todos={todos}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      )}

      <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
        >
          Logout
        </button>
      </div>
    </div>
  );
}