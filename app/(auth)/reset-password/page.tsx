import { Suspense } from 'react';
import ResetPasswordForm from '@/features/auth/components/reset-password';
import { Loader2 } from 'lucide-react';
export default async function ResetPasswordPage() {
  return (
    <main className="flex w-full min-h-screen items-center justify-center">
      <Suspense
        fallback={
          <div>
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
