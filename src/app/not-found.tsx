import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 text-gray-600">Oops! The page you are looking for does not exist.</p>
      <Link href="/" className="mt-6 px-4 py-2 bg-black text-white rounded-lg">
        Go Back Home
      </Link>
    </div>
  );
}
