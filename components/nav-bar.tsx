'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Home, Shield, Calendar, Settings, User, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuth } from './auth-provider';
import { Logo } from './logo';
import Link from 'next/link';

export function NavBar() {
  const pathname = usePathname();
  const { user, isLoading, logout } = useAuth();
  
  if (isLoading) {
    return (
      <nav className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto px-6 max-w-[1600px]">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-teal-200 rounded animate-pulse" />
              <div className="h-6 w-20 bg-teal-200 rounded animate-pulse" />
            </div>
            <div className="h-8 w-8 bg-primary/20 rounded-full animate-pulse" />
          </div>
        </div>
      </nav>
    );
  }

  if (!user) {
    return null; // Don't show navbar on login page
  }

  const isAdmin = user.role === 'org_admin' || user.role === 'app_admin';
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-6 max-w-[1600px]">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Logo size={32} />
            </Link>
            
            {user.role === 'org_admin' && (
              <Link href="/admin">
                <Button 
                  variant={pathname === '/admin' ? 'default' : 'ghost'}
                  size="sm"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Admin
                </Button>
              </Link>
            )}
          </div>

          {/* Right side navigation */}
          <div className="flex items-center gap-2">
            {user.role === 'app_admin' && (
              <div className="flex items-center bg-muted rounded-lg p-1">
                <Link href="/dashboard">
                  <Button 
                    variant={pathname === '/dashboard' ? 'default' : 'ghost'}
                    size="sm"
                    className="h-8"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule
                  </Button>
                </Link>
                <Link href="/superadmin">
                  <Button 
                    variant={pathname.startsWith('/superadmin') ? 'default' : 'ghost'}
                    size="sm"
                    className="h-8"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Super Admin
                  </Button>
                </Link>
              </div>
            )}
            
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline">{user.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-semibold">{user.name}</span>
                  <span className="text-xs text-muted-foreground font-normal">{user.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => logout()}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}