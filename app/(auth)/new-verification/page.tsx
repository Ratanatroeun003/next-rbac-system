import { verifyEmail } from '@/features/auth/actions/verify-email';
import { redirect } from 'next/navigation';
interface NewVerificationPageProps {
  searchParams: Promise<{ token?: string }>;
}
export default async function NewVerificationPage({
  searchParams,
}: NewVerificationPageProps) {
  const { token } = await searchParams;
  if (!token) {
    return redirect('/auth-error?error=MissingToken');
  }
  const res = await verifyEmail(token);
  if (res?.error) {
    return redirect('/auth-error?error=InvalidTokenOrExpired');
  }
  return redirect('/sign-in?success=verify-email');
}
