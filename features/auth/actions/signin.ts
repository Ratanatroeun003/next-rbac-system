'use server';
import { signIn } from '@/lib/auth';
import { signinSchema, signinInput } from '@/features/auth/auth.schema';
import { AuthError } from 'next-auth';
export const credentialSignInAction = async (values: signinInput) => {
  const validatedFields = signinSchema.safeParse(values);
  if (!validatedFields.success) return { error: 'Invalid data input!' };
  try {
    await signIn('credentials', {
      ...validatedFields.data,
      redirect:false,
    });
    return {success:'SignIn Successfully'}
  } catch (error) {
    console.log('error',error)
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error:'Invalid credential!' };
        case 'AccessDenied':
         return { error: 'Please verify your email before signing in.' };
        default:
          return { error:  error.cause?.err?.message||'Signin failed. Please try again!' };
          }
    }
     return {error:'Signin failed'}
  }
};
