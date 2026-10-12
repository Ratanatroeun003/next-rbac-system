'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboardIcon,
  ShoppingBag,
  User,
  LogOut,
  Home,
} from 'lucide-react';
import Link from 'next/link';

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <User />
              <span>@trna</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white">Project</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={
                    <Link href="/admin/dashboard">
                      <LayoutDashboardIcon />
                      <span>Dashboard</span>
                    </Link>
                  }
                  tooltip="Dashboard"
                />
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  render={
                    <Link href="/admin/projects">
                      <ShoppingBag />
                      <span>Projects</span>
                    </Link>
                  }
                  tooltip="Projects"
                />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={
                    <Link href="/">
                      <Home className="h-4 w-4" />
                      <span>Home</span>
                    </Link>
                  }
                  tooltip="Home"
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="mx-auto">
            <SidebarMenuButton
              onClick={() => signOut({ callbackUrl: '/auth/signin' })}
              tooltip="SignOut"
              className="bg-destructive hover:bg-destructive/90 hover:cursor-pointer text-white"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
