import Link from 'next/link';

export default function TaskNotFound() {
  return (
    <div className="text-center py-10 bg-white rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Tugas Tidak Ditemukan</h2>
      <p className="text-gray-500 mb-6">Tugas yang Anda cari tidak ada di sistem.</p>
      <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Kembali ke Daftar
      </Link>
    </div>
  );
}