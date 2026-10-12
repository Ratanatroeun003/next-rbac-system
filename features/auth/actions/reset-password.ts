'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { resetPasswordSchema,resetPasswordInput } from '../auth.schema';
export async function resetPassword(values:resetPasswordInput,token:string) {
  const validatedFields = resetPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields. Please try again.' };
  }
  const {password } = validatedFields.data;
  try {
    const existingToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });
    if (!existingToken) {
      return { error: 'Invalid reset token.' };
    }
    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
      return { error: 'Reset token has expired. Please request a new one.' };
    }
    const existingUser = await prisma.user.findUnique({
      where: { email: existingToken.email },
    });
    if (!existingUser) {
      return { error: 'User account does not exist.' };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    });
    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
    return { success: 'Password has been successfully updated!' };
  } catch (error) {
    return { error: 'Something went wrong. Please try again later.' };
  }
}