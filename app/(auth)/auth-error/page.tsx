import { Suspense } from 'react';
import AuthError from '@/features/auth/components/auth-error';
import { Loader2 } from 'lucide-react';
export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div>
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      }
    >
      <AuthError />
    </Suspense>
  );
}
