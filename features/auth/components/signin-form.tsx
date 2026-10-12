'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { Separator } from '@/components/ui/separator';
import { useSearchParams } from 'next/navigation';
import { resendVerificationEmail } from '@/features/auth/actions/resend-verification';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  signinSchema,
  signinInput,
  forgotPasswordSchema,
} from '@/features/auth/auth.schema';
import { credentialSignInAction } from '@/features/auth/actions/signin';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldGroup,
  FieldSet,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';
import { Loader2, Eye, EyeOff, CheckCircle2, Info } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { AuthCardWrapper } from './auth-wrapper';
import { toast } from 'sonner';
const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isResend, setIsResend] = useState(false);
  const [isOauthSignIn, startTransition] = useTransition();
  const [isResending, startResendTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const info = searchParams.get('info');
  const success = searchParams.get('success');
  const error = searchParams.get('error');
  const destination =
    callbackUrl && callbackUrl.startsWith('/') && !callbackUrl.startsWith('//')
      ? callbackUrl
      : '/';
  let alertMessage: {
    type: 'error' | 'success' | 'info';
    text: string;
  } | null = null;
  if (error) {
    switch (error) {
      case 'OAuthAccountNotLinked':
        alertMessage = {
          type: 'error',
          text: 'This email is already registered. Please sign in using your email and password instead.',
        };
        break;
      default:
        alertMessage = {
          type: 'error',
          text: 'Something went wrong. Please try again.',
        };
    }
  } else if (success) {
    switch (success) {
      case 'verify-email':
        alertMessage = {
          type: 'success',
          text: 'Your email has been verified. You can now sign in.',
        };
        break;
      case 'reset-password':
        alertMessage = {
          type: 'success',
          text: 'Password reset successfully.',
        };
        break;
      case 'check-your-email':
        alertMessage = {
          type: 'success',
          text: 'Password reset link has been sent to your email. Please check your inbox.',
        };
        break;
      default:
        alertMessage = {
          type: 'success',
          text: 'Success!',
        };
    }
  } else if (info) {
    switch (info) {
      case 'verify-email':
        alertMessage = {
          type: 'info',
          text: 'Please check your email to verify your account.',
        };
        break;
      default:
        alertMessage = {
          type: 'info',
          text: 'Please check the information provided.',
        };
    }
  }
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signinInput>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (data: signinInput) => {
    setIsResend(false);
    try {
      const { error, success } = await credentialSignInAction(data);
      if (error) {
        if (error === 'Please verify your email before signing in.') {
          setIsResend(true);
        }
        toast.error(error);
        return;
      }
      if (success) {
        toast.success(success);
        router.push(destination);
        router.refresh();
      }
    } catch (error) {
      toast.error(
        'Something went wrong. Please check your connection and try again.',
      );
    }
  };
  const oauthSignIn = async (provider: 'google' | 'github' | 'facebook') => {
    startTransition(async () => {
      await signIn(provider, { callbackUrl: destination });
    });
  };
  const handleResend = () => {
    const emailValue = getValues('email');
    const validEmail = forgotPasswordSchema.safeParse({ email: emailValue });
    if (!validEmail.success) {
      toast.error('Please provide a valid email address.');
      return;
    }
    startResendTransition(async () => {
      try {
        const res = await resendVerificationEmail({ email: emailValue });
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success(res.success);
          setIsResend(false);
        }
      } catch (error) {
        toast.error(
          'Unable to connect to the server. Please check your internet connection and try again.',
        );
      }
    });
  };
  const isLoading = isOauthSignIn || isResending || isSubmitting;
  const showResendButton = isResend || info === 'verify-email';
  return (
    <AuthCardWrapper
      headerTitle="Welcome back"
      headerDescription="Enter your email below to login to your account"
      backText="Don't have an account?"
      backButtonLabel="Sign Up"
      backButtonHref="/sign-up"
    >
      {alertMessage && (
        <div
          className={`flex items-start gap-3 p-3.5 mb-4 rounded-lg border text-sm ${
            alertMessage.type === 'success'
              ? 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30'
              : alertMessage.type === 'error'
                ? 'bg-red-500/15 text-red-600 border-red-500/30'
                : 'bg-blue-500/15 text-blue-600 border-blue-500/30'
          }`}
        >
          {alertMessage.type === 'success' ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
          ) : alertMessage.type === 'error' ? (
            <Info className="h-5 w-5 shrink-0 mt-0.5 text-red-600" />
          ) : (
            <Info className="h-5 w-5 shrink-0 mt-0.5" />
          )}
          <p className="font-medium leading-relaxed">{alertMessage.text}</p>
          {showResendButton && (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="text-xs font-semibold text-red-700 hover:underline inline-flex items-center gap-1 self-start disabled:opacity-50 mt-1 cursor-pointer"
            >
              {isResending && <Loader2 className="h-3 w-3 animate-spin" />}
              Click here to resend verification email
            </button>
          )}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FieldSet disabled={isLoading}>
          <FieldGroup>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input placeholder="name@example.com" {...register('email')} />
              <FieldError>{errors.email?.message}</FieldError>
            </Field>
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel>Password</FieldLabel>
                <Link
                  href="/forgot-password"
                  aria-disabled={isLoading}
                  tabIndex={isLoading ? -1 : undefined}
                  className={`text-xs text-blue-600 hover:underline ${
                    isLoading ? 'pointer-events-none opacity-50' : ''
                  }`}
                >
                  Forgot password?
                </Link>
              </div>
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
                  onClick={() => setShowPassword((prev) => !prev)}
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
          </FieldGroup>
        </FieldSet>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-70 mt-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>
      <Separator className="my-4 bg-border/60" />
      <p className="text-center text-sm text-muted-foreground mb-4">
        Or continue with
      </p>
      <Button
        disabled={isLoading}
        onClick={() => oauthSignIn('google')}
        variant="outline"
        className="flex items-center w-full justify-center gap-2 border border-border hover:bg-muted/50 hover:cursor-pointer"
      >
        {isOauthSignIn ? (
          <p>connecting...</p>
        ) : (
          <>
            <FcGoogle className="w-4 h-4" /> <span>Continue with Google</span>
          </>
        )}
      </Button>
    </AuthCardWrapper>
  );
};

export default SignInForm;
