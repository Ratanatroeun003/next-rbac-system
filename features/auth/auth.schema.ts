// lib/validations/auth.ts
import { z } from "zod";

// ==========================================
// 1. SIGN IN SCHEMA
// ==========================================
export const signinSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address format" }),

  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(10, { message: "Password must not exceed 10 characters" }),
});

export type signinInput = z.infer<typeof signinSchema>;

// ==========================================
// 2. SIGN UP SCHEMA
// ==========================================
export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Full name is required" })
      .min(2, { message: "Name must be at least 2 characters" })
      .max(50, { message: "Name must not exceed 50 characters" }),

    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address format" }),

    phone: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^[0-9+\s-]{8,15}$/.test(val),
        { message: "Invalid phone number format" }
      ),

    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" })
      .max(10, { message: "Password must not exceed 10 characters" }),

    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // បង្ហាញ error ត្រង់ field confirmPassword
  });

export type signupInput = z.infer<typeof signupSchema>;

export const resetPasswordSchema = z.object({
  password:z.string()
  .min(1,{message:'Password is required'})
  .min(6,{message:'Password must be at least 6 characters long'})
  .max(10, { message: "Password must not exceed 10 characters" }),
  confirmPassword:z.string().min(1,{message:"Confirm Password is required"})

}).refine((data)=> data.password === data.confirmPassword,{message:"Passwords don't match",path:['confirmPassword']})
export type resetPasswordInput = z.infer<typeof resetPasswordSchema>

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

export type forgotPasswordInput = z.infer<typeof forgotPasswordSchema>;