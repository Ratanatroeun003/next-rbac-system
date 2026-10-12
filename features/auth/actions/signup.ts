'use server'
import { prisma } from "@/lib/prisma"
import { signupInput,signupSchema } from "../auth.schema"
import { generateVerificationToken } from "@/lib/token"
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/lib/mail"
export const signUp =async (data:signupInput)=>{
  const validationField = signupSchema.safeParse(data)
  if(!validationField.success){
    return {error:'Invalid input fields!'}
  }
    const {email,password,phone,name} = validationField.data
    try {
        const existingUser = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(existingUser){
            return {error:'Email is already in use!'}
        }
        const hashedPassword =await bcrypt.hash(password,10)
        await prisma.user.create({
            data:{
                name,
                email,
                phone,
                password:hashedPassword
            }
        })
        const verificationToken = await generateVerificationToken(email)
        await sendVerificationEmail(verificationToken.email,verificationToken.token)
        return {success:'Sign up successful! Please check your email to verify your account before signing in.'}
        
    } catch (error) {
        console.error("SIGNUP_ERROR:", error);
       return { error: "Something went wrong. Please try again!" };  
    }
  }
