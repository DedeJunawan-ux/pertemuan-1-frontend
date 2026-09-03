'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterForm() {
  const router = useRouter();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/login');
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Register</h1>
        <p className="text-sm text-gray-500">Buat akun baru</p>
      </div>
      
      <form className="space-y-4" onSubmit={handleRegister} autoComplete="off">
        <input type="text" style={{ display: 'none' }} />
        <input type="password" style={{ display: 'none' }} />

        <div>
          <label className="block text-sm text-gray-700 mb-1.5">Nama Lengkap:</label>
          <input 
            type="text" 
            name="new_user_fullname"
            autoComplete="off" 
            placeholder="Masukkan nama" 
            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-700 mb-1.5">Email:</label>
          <input 
            type="email" 
            name="new_user_email"
            autoComplete="off" 
            placeholder="usertest@diet.com" 
            className="w-full px-4 py-2 bg-blue-50/50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" 
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-700 mb-1.5">Password:</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              name="new_user_password"
              autoComplete="new-password" 
              placeholder="••••••••" 
              className="w-full px-4 py-2 bg-blue-50/50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 pr-16" 
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-blue-600 hover:text-blue-800"
            >
              {showPassword ? "Tutup" : "Lihat"}
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm text-gray-700 mb-1.5">Konfirmasi Password:</label>
          <div className="relative">
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              name="new_user_password_confirm"
              autoComplete="new-password" 
              placeholder="Ulangi password" 
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 pr-16" 
            />
            <button 
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-blue-600 hover:text-blue-800"
            >
              {showConfirmPassword ? "Tutup" : "Lihat"}
            </button>
          </div>
        </div>
        
        <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors mt-4">
          Register
        </button>
      </form>
      
      <p className="text-center text-sm text-gray-600 mt-6">
        Sudah punya akun? <Link href="/login" className="text-blue-600 hover:underline">Login di sini</Link>
      </p>
    </div>
  );
}