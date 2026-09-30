'use client';

import React from 'react';
import Link from 'next/link';
import { Todo } from '@/types/todo';

function Badge({
  variant,
  children,
}: {
  variant: 'purple' | 'green' | 'yellow';
  size?: 'default' | 'sm';
  children: React.ReactNode;
}) {
  const variantStyles = {
    purple: 'bg-purple-100 text-purple-700 border-purple-200',
    green: 'bg-green-100 text-green-700 border-green-200',
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variantStyles[variant]}`}
    >
      {children}
    </span>
  );
}

type TaskDetailCardProps = {
  todo: Todo;
};

export default function TaskDetailCard({ todo }: TaskDetailCardProps) {
  return (
    <main className="min-h-screen p-6 md:p-10 bg-white text-gray-700">
      <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
        <header className="mb-6 border-b border-gray-100 pb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Detail Tugas</h1>
          <Link
            href="/"
            className="text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 px-3.5 py-2 rounded-lg transition shadow-xs"
          >
            Kembali ke Daftar
          </Link>
        </header>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              ID Tugas
            </label>
            <div className="mt-1">
              <Badge variant="purple" size="default">
                #{todo.id}
              </Badge>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Judul Tugas
            </label>
            <h2 className="text-xl font-bold text-gray-900 mt-0.5">{todo.title}</h2>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Status
            </label>
            <div className="mt-1">
              <Badge
                variant={todo.completed ? 'green' : 'yellow'}
                size="sm"
              >
                {todo.completed ? 'Selesai' : 'Belum Selesai'}
              </Badge>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Tanggal Dibuat
            </label>
            <p className="text-gray-500 text-sm mt-1">{todo.createdAt}</p>
          </div>
        </div>
      </div>
    </main>
  );
}