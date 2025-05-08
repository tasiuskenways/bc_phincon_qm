import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="flex-1 max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 mt-16 flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold text-white mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-white mb-4">
        Content Not Found
      </h2>
      <p className="text-lg text-gray-400 max-w-2xl mb-8">
        Oops! The content you are looking for might have been removed, had its
        name changed, or is temporarily unavailable.
      </p>
      <Link
        className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        href={"/"}
      >
        Back to Home
      </Link>
    </div>
  );
}
