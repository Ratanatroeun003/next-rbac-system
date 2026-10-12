import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogOutIcon, LogInIcon, SettingsIcon } from 'lucide-react';
import { ModeToggle } from '@/features/theme/mode-toggle';
import { signoutAction } from '@/features/auth/actions/signout';
import { auth } from '@/lib/auth';
const Header = async () => {
  const allowedRole = ['ADMIN', 'SUPER_ADMIN'];
  const session = await auth();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-lg font-extrabold tracking-tight text-foreground transition-opacity hover:opacity-80 sm:text-xl"
          >
            Ratana<span className="text-primary">.dev</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <ModeToggle />
          {!session ? (
            <Link
              href="/sign-in"
              className="flex items-center gap-1 px-2 py-1 border border-border rounded-full text-sm font-medium text-blue-500"
            >
              Signin <LogInIcon className="w-4 h-4" />
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              {allowedRole.includes(session.user.role) && (
                <Link
                  href="/admin"
                  className="flex items-center gap-1 px-2 py-1 border border-border rounded-full text-sm font-medium text-blue-500"
                >
                  <SettingsIcon className="w-4 h-4" />
                </Link>
              )}
              <Link href="/dashboard" title="Dashboard">
                Dashboard
              </Link>
              <form action={signoutAction}>
                <Button
                  variant="outline"
                  size="sm"
                  type="submit"
                  className="flex items-center gap-1 text-sm font-medium text-red-500"
                >
                  <p>Signout</p>
                  <LogOutIcon className="h-4 w-4" />
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
