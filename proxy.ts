
import { AUTH_ROUTES,PUBLIC_ROUTES,ADMIN_PREFIX,DEFAULT_LOGIN_REDIRECT } from "./route";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
export const proxy = auth((req)=> {
  const isLoggedIn = !!req.auth;
  const { pathname,search} = req.nextUrl;
  const userRole = req.auth?.user?.role;
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname)
  const isAuthRoute = AUTH_ROUTES.includes(pathname)
  const isAdminRoute =
  pathname === ADMIN_PREFIX ||
  pathname.startsWith(`${ADMIN_PREFIX}/`);
  if (isAdminRoute) {
     if (!isLoggedIn) {
         const signInUrl = new URL("/sign-in", req.url);
        signInUrl.searchParams.set("callbackUrl", `${pathname}${search}`);
        return NextResponse.redirect(signInUrl);
      }
      const allowedRoles = ["ADMIN","SUPER_ADMIN"]
      if (!userRole || !allowedRoles.includes(userRole)) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
  }
  if(!isLoggedIn && !(isPublicRoute || isAuthRoute)){
    const signInUrl = new URL('/sign-in',req.url)
    signInUrl.searchParams.set('callbackUrl',`${pathname}${search}`)
    return NextResponse.redirect(signInUrl)
  }
  if(isAuthRoute && isLoggedIn){
     return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
  }
  return NextResponse.next();
});
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};