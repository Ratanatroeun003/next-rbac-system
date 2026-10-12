'use server'
import {signOut} from '@/lib/auth'
export const signoutAction = async () => {
    await signOut({redirectTo:'/sign-in'});
}