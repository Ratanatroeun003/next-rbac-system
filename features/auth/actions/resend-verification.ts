'use server';

import { prisma } from '@/lib/prisma';
import { generateVerificationToken } from '@/lib/token';
import { sendVerificationEmail } from '@/lib/mail';
import { forgotPasswordInput,forgotPasswordSchema } from '../auth.schema';
export async function resendVerificationEmail(data: forgotPasswordInput) {
  try {
   const validatedField = forgotPasswordSchema.safeParse(data)
  if (!validatedField.success) {
    return { error: 'Please provide a valid email address.' };
  }
  const existingUser = await prisma.user.findUnique({
    where: { email:validatedField.data.email },
  });
  if (!existingUser || !existingUser.email) {
    return { error: 'No account found with this email address.' };
  }
  if (existingUser.emailVerified) {
    return { error: 'This email is already verified. You can sign in now.' };
  }
  const verificationToken = await generateVerificationToken(existingUser.email);
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token
  );
  return { success: 'Verification email sent! Please check your inbox.' };
  } catch (error) {
    return {error:'Something went wrong'}
  }
}