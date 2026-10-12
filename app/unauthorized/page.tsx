import Link from 'next/link';
export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-4xl font-bold text-red-600">401 - Unauthorized</h1>
      <p className="text-muted-foreground mt-2">
        you do not have permission to access this page. Please contact the
        administrator if you believe this is an error.
      </p>
      <Link
        href="/"
        className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-md"
      >
        Back to Home
      </Link>
    </div>
  );
}
