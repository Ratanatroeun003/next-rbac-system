'use server';

import { forgotPasswordSchema, forgotPasswordInput } from '@/features/auth/auth.schema';
import { prisma } from '@/lib/prisma';
import { generatePasswordResetToken } from '@/lib/token';
import { sendEmailResetPassword } from '@/lib/mail';

export async function requestPasswordReset(values: forgotPasswordInput) {
  const validatedFields = forgotPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid email address!' };
  }
  const { email } = validatedFields.data;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (!existingUser) {
      return { success: 'If an account with that email exists, we have sent a password reset link.' };
    }
    const passwordResetToken = await generatePasswordResetToken(email);
    await sendEmailResetPassword(
      passwordResetToken.email,
      passwordResetToken.token
    );
    return { success: 'Reset password email sent! Please check your inbox.' };
  } catch (error) {
    console.error('Forgot password error:', error);
    return { error: 'Something went wrong. Please try again later.' };
  }
}