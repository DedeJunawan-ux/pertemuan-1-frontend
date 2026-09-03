'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.cookie = "isLoggedIn=; max-age=0; path=/";
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    document.cookie = "isLoggedIn=true; path=/";
    router.push('/cached');
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Login</h1>
        <p className="text-sm text-gray-500">Masuk ke akun Anda</p>
      </div>
      
      <form className="space-y-5" onSubmit={handleLogin} autoComplete="off">
        <div>
          <label className="block text-sm text-gray-700 mb-1.5">Email / Username:</label>
          <input 
            type="text" 
            autoComplete="new-password" 
            placeholder="usertest@diet.com"
            className="w-full px-4 py-2.5 bg-blue-50/50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-700 mb-1.5">Password:</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              autoComplete="new-password" 
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-blue-50/50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-16"
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

        <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors mt-2">
          Login
        </button>
      </form>
      
      <p className="text-center text-sm text-gray-600 mt-6">
        Belum punya akun? <Link href="/register" className="text-blue-600 hover:underline">Daftar di sini</Link>
      </p>
    </div>
  );
}