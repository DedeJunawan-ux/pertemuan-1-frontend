import TodoStateOnlyApp from './components/TodoStateOnlyApp';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function TodoPage() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get('isLoggedIn');

  if (!isLoggedIn) {
    redirect('/login');
  }

  const initialTodos: any[] = [];

  return (
    <main className="min-h-screen p-6 md:p-10 bg-white text-gray-800">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
          
          <header className="mb-6 border-b border-gray-100 pb-4 flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold">
              Daftar Tugas (Todo List)
            </h1>
            <Link 
              href="/login" 
              className="text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </Link>
          </header>

          <TodoStateOnlyApp initialTodos={initialTodos} />
        </div>
      </div>
    </main>
  );
}