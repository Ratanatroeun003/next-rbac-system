'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, signupInput } from '@/features/auth/auth.schema';
import { signUp } from '../actions/signup';
import { Input } from '@/components/ui/input';
import { FcGoogle } from 'react-icons/fc';
import {
  Field,
  FieldGroup,
  FieldSet,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { AuthCardWrapper } from './auth-wrapper';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';
const SignUpForm = () => {
  const searchparams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const callbackUrl = searchparams.get('callbackUrl');
  const destination =
    callbackUrl && callbackUrl.startsWith('/') ? callbackUrl : '/';
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });
  const onSubmit = async (data: signupInput) => {
    try {
      const res = await signUp(data);
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      toast.success(res.success);
      router.push('/sign-in?info=verify-email');
    } catch (error) {
      toast.error(
        'Something went wrong. Please check your connection and try again.',
      );
    }
  };
  const oauthSignIn = (provider: 'google' | 'github' | 'facebook') => {
    startTransition(async () => {
      await signIn(provider, { callbackUrl: destination });
    });
  };
  return (
    <AuthCardWrapper
      headerTitle="Create an Account"
      headerDescription="Enter your details below to register for HEANG STORE"
      backText="Already have an account?"
      backButtonLabel="Sign In"
      backButtonHref="/sign-in"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FieldSet disabled={isSubmitting || isPending}>
          <FieldGroup>
            <Field>
              <FieldLabel>Full Name</FieldLabel>
              <Input placeholder="John Doe" {...register('name')} />
              <FieldError>{errors.name?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                type="email"
                placeholder="name@example.com"
                {...register('email')}
              />
              <FieldError>{errors.email?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel>Phone Number (Optional)</FieldLabel>
              <Input
                type="tel"
                placeholder="012345678"
                {...register('phone')}
              />
              <FieldError>{errors.phone?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel>Password</FieldLabel>
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
              <FieldLabel>Confirm Password</FieldLabel>
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
              Creating account...
            </>
          ) : (
            'Sign Up'
          )}
        </Button>
      </form>
      <Separator className="my-4 bg-border/60" />
      <p className="text-center text-sm text-muted-foreground mb-4">
        Or continue with
      </p>
      <Button
        disabled={isSubmitting || isPending}
        onClick={() => oauthSignIn('google')}
        variant="outline"
        className="flex items-center w-full justify-center gap-2 border border-border hover:bg-muted/50 hover:cursor-pointer"
      >
        {isPending ? (
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
export default SignUpForm;
