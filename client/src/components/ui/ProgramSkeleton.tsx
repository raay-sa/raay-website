// src/components/ui/ProgramSkeleton.tsx
export default function ProgramSkeleton() {
  return (
    <div className="animate-pulse border rounded-xl p-4 bg-white">
      <div className="h-40 bg-gray-200 rounded-md mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  );
}
