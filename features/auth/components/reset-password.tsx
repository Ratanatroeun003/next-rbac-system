'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  resetPasswordSchema,
  resetPasswordInput,
} from '@/features/auth/auth.schema';
import { resetPassword } from '@/features/auth/actions/reset-password';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldGroup,
  FieldSet,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<resetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  const onSubmit = async (data: resetPasswordInput) => {
    if (!token) {
      toast.error('Missing reset password token. Please request a new link.');
      return;
    }
    try {
      const { error, success } = await resetPassword(data, token);
      if (error) {
        toast.error(error);
        return;
      }
      toast.success(success);
      router.push('/sign-in?success=reset-password');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };
  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-card border rounded-xl shadow-sm">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Reset Password</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Enter your new password below
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FieldSet disabled={isSubmitting}>
          <FieldGroup>
            <Field>
              <FieldLabel>New Password</FieldLabel>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className="pr-10 [&::-ms-clear]:hidden [&::-ms-reveal]:hidden"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-0 right-0 h-full px-3"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <FieldError>{errors.password?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel>Confirm New Password</FieldLabel>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword')}
                  className="pr-10 [&::-ms-clear]:hidden [&::-ms-reveal]:hidden"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-0 right-0 h-full px-3"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <FieldError>{errors.confirmPassword?.message}</FieldError>
            </Field>
          </FieldGroup>
        </FieldSet>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-70 mt-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Resetting password...
            </>
          ) : (
            'Reset Password'
          )}
        </Button>
      </form>
      <div className="mt-6 text-center text-sm text-muted-foreground space-y-2">
        <div>
          Remember your password?{' '}
          <Link
            href="/sign-in"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign In
          </Link>
        </div>
        <div>
          Need a new link?{' '}
          <Link
            href="/forgot-password"
            className="text-blue-600 hover:underline font-medium"
          >
            Request new link
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
