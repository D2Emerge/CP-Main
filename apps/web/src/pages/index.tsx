import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Code Project Base
        </h1>
        <div className="flex justify-center space-x-4">
          <Link href="/login" className="text-blue-500 underline">
            Login
          </Link>
          <Link href="/logout" className="text-blue-500 underline">
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}
