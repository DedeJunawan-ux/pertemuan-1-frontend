import TaskDetailCard from './components/TaskDetailCard';

export default async function TaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  return (
    <main className="min-h-screen p-6 md:p-10 bg-gray-50 flex justify-center">
      <div className="w-full max-w-2xl">
        <TaskDetailCard taskId={resolvedParams.id} />
      </div>
    </main>
  );
}