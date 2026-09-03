'use client';
import { useState } from 'react';

interface TodoFormProps {
  onAddTodo: (title: string, description: string) => void;
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAddTodo(title, description || 'Tidak ada deskripsi spesifik.');
    
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div>
        <input 
          type="text" 
          placeholder="Apa yang ingin kamu kerjakan?" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <textarea 
          placeholder="Ketik detail/deskripsi tugas di sini..." 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 resize-none h-20"
        />
      </div>
      <button type="submit" className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
        Tambah Tugas
      </button>
    </form>
  );
}