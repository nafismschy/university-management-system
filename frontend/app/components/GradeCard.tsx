"use client";
export default async function GradeCard({ grade }: { grade: any }) {
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">    
          <div
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              Student ID
            </dt>
            <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
              {grade.id}
            </dd>
            <dt className="truncate text-sm font-medium text-gray-500">
              OBE
            </dt>
            <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
              {grade.OBE}
            </dd>
            <dt className="truncate text-sm font-medium text-gray-500">
              Quiz
            </dt>
            <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
              {grade.quiz}
            </dd>
            <dt className="truncate text-sm font-medium text-gray-500">
              Attendance
            </dt>
            <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
              {grade.attendance}
            </dd>
            <dt className="truncate text-sm font-medium text-gray-500">
              Term
            </dt>
            <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
              {grade.term}
            </dd>
            <dt className="truncate text-sm font-medium text-gray-500">
              Total
            </dt>
            <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
              {grade.total}
            </dd>
          </div>
      </dl>
    </div>
  );
}
