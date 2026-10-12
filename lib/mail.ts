import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/new-verification?token=${token}`;

  await resend.emails.send({
    from: 'HEANG STORE <onboarding@resend.dev>', 
    to: email,
    subject: 'Confirm your email - HEANG STORE',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #2563eb;">Welcome to HEANG STORE!</h2>
        <p>Thank you for signing up. Please click the button below to verify your email address:</p>
        <a 
          href="${confirmLink}" 
          style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 16px 0;"
        >
          Verify Email Address
        </a>
        <p style="font-size: 13px; color: #666;">This verification link will expire in 1 hour.</p>
        <p style="font-size: 12px; color: #999;">If you did not request this, please ignore this email.</p>
      </div>
    `,
  });
};
export const sendEmailResetPassword = async (email: string, token: string) => {
  const resetLink = `${domain}/reset-password?token=${token}`;
  await resend.emails.send({
    from: 'HEANG STORE <onboarding@resend.dev>',
    to: email,
    subject: 'Reset your password - HEANG STORE',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #2563eb;">HEANG STORE - Password Reset</h2>
        <p>You requested a password reset. Please click the button below to set a new password:</p>
        <a 
          href="${resetLink}" 
          style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 16px 0;"
        >
          Reset Password
        </a>
        <p style="font-size: 13px; color: #666;">This password reset link will expire in 1 hour.</p>
        <p style="font-size: 12px; color: #999;">If you did not request this, please ignore this email.</p>
      </div>
    `,
  });
}