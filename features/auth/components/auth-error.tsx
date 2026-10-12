'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  let errorMessage =
    'An unexpected authentication error occurred. Please try again.';

  switch (error) {
    case 'OAuthAccountNotLinked':
      errorMessage =
        'Email already in use with another provider. Please sign in using your original method.';
      break;
    case 'AccessDenied':
      errorMessage = 'Access denied. Do not have permission to sign in.';
      break;
    case 'Configuration':
      errorMessage =
        'There is a problem with the server configuration. Please try again later.';
      break;
    case 'MissingToken':
      errorMessage = 'The verification token is missing or invalid.';
      break;
    case 'InvalidTokenOrExpired':
      errorMessage =
        'The verification link has expired or is invalid. Please request a new one.';
      break;
    default:
      errorMessage = error ? `Error code: ${error}` : errorMessage;
  }

  return (
    <div className="w-full min-h-screen p-4 flex items-center justify-center">
      <div className="max-w-md w-full p-6 border rounded-xl shadow-sm bg-card text-card-foreground text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-3 bg-red-500/15 text-red-600 rounded-full">
            <AlertCircle className="h-8 w-8" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-red-600">
          Authentication Error
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {errorMessage}
        </p>
        <div className="flex gap-4 justify-center pt-2">
          <Link
            href="/sign-in"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm font-medium transition-colors"
          >
            Go to Sign In
          </Link>
          <Link
            href="/sign-up"
            className="px-4 py-2 border rounded-md text-sm font-medium transition-colors"
          >
            Go to Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
