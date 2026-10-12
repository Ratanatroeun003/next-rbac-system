'use client';

import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
interface AuthCardWrapperProps {
  children: React.ReactNode;
  headerTitle: string;
  headerDescription: string;
  backButtonLabel: string;
  backButtonHref: string;
  backText?: string;
}
export function AuthCardWrapper({
  children,
  headerTitle,
  headerDescription,
  backButtonLabel,
  backButtonHref,
  backText,
}: AuthCardWrapperProps) {
  return (
    <div className="w-full min-h-screen p-4 flex items-center justify-center">
      <Card className="w-full rounded-none max-w-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">{headerTitle}</CardTitle>
          <CardDescription>{headerDescription}</CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6">{children}</CardContent>
        <CardFooter className="flex-col gap-4 border-t border-slate-800/60 bg-transparent py-5">
          <div className="text-center text-sm text-slate-400">
            {backText && <span>{backText} </span>}
            <Link
              href={backButtonHref}
              className="text-blue-500 hover:underline"
            >
              {backButtonLabel}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
