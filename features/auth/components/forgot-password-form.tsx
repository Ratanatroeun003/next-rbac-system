'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  forgotPasswordSchema,
  forgotPasswordInput,
} from '@/features/auth/auth.schema';
import { useRouter } from 'next/navigation';
import { requestPasswordReset } from '../actions/forgot-password';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldGroup,
  FieldSet,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';
import { Loader2 } from 'lucide-react';
import { AuthCardWrapper } from './auth-wrapper';
import { toast } from 'sonner';
export const ForgotPasswordForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<forgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });
  const onSubmit = async (data: forgotPasswordInput) => {
    try {
      const { success, error } = await requestPasswordReset(data);
      if (error) {
        toast.error(error);
        return;
      }
      if (success) {
        toast.success(success);
        router.push('/sign-in?success=check-your-email');
      }
    } catch (error) {
      toast.error('Something went wrong. Please check your connection.');
    }
  };
  return (
    <AuthCardWrapper
      headerTitle="Forgot Password"
      headerDescription="Enter your email address and we will send you a link to reset your password"
      backText="Remember your password?"
      backButtonLabel="Sign In"
      backButtonHref="/sign-in"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FieldSet disabled={isSubmitting}>
          <FieldGroup>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input placeholder="name@example.com" {...register('email')} />
              <FieldError>{errors.email?.message}</FieldError>
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
              Sending reset link...
            </>
          ) : (
            'Send Reset Link'
          )}
        </Button>
      </form>
    </AuthCardWrapper>
  );
};
