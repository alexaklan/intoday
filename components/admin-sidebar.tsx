'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  CalendarCheck, 
  Building, 
  Users, 
  Settings, 
  UserCog,
  Bell,
  Shield,
  BarChart3,
  Home
} from 'lucide-react';
import { currentUser, getOrganisationById } from '@/lib/mock-data';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  const organisation = getOrganisationById(currentUser.organisationId);
  const isAppAdmin = currentUser.role === 'app_admin';
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  const menuItems = [
    {
      id: 'schedules',
      label: 'Team Schedules',
      icon: CalendarCheck,
      description: 'View and manage schedules'
    },
    {
      id: 'teams',
      label: 'Teams',
      icon: Users,
      description: 'Manage teams'
    },
    {
      id: 'users',
      label: 'Users',
      icon: UserCog,
      description: 'Manage users'
    },
    {
      id: 'organisations',
      label: 'Organisations',
      icon: Building,
      description: 'Manage organisations',
      adminOnly: true
    }
  ];
  
  const settingsItems = [
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      description: 'View reports'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      description: 'Notification settings'
    },
    {
      id: 'account',
      label: 'Account Settings',
      icon: Settings,
      description: 'Your account'
    }
  ];
  
  return (
    <aside className="w-64 border-r bg-muted/10 min-h-screen p-6 flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-4 -ml-2">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <div className="flex items-center gap-3 mb-2">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(currentUser.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{currentUser.name}</h3>
            <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          <Badge variant="outline" className="text-xs">
            <Shield className="mr-1 h-3 w-3" />
            {currentUser.role === 'org_admin' ? 'Org Admin' : 'App Admin'}
          </Badge>
        </div>
      </div>
      
      <Separator className="mb-4" />
      
      {/* Organisation Info */}
      {organisation && (
        <>
          <div className="mb-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">ORGANISATION</p>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-background">
              <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Building className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{organisation.name}</p>
              </div>
            </div>
          </div>
          
          <Separator className="mb-4" />
        </>
      )}
      
      {/* Main Navigation */}
      <div className="flex-1">
        <p className="text-xs font-medium text-muted-foreground mb-2">MANAGEMENT</p>
        <nav className="space-y-1 mb-6">
          {menuItems.map(item => {
            if (item.adminOnly && !isAppAdmin) return null;
            
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  'w-full flex items-start gap-3 px-3 py-2 rounded-lg text-left transition-colors',
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted'
                )}
              >
                <Icon className={cn('h-5 w-5 mt-0.5 flex-shrink-0', isActive ? 'text-primary-foreground' : 'text-muted-foreground')} />
                <div className="flex-1 min-w-0">
                  <p className={cn('text-sm font-medium', isActive && 'text-primary-foreground')}>
                    {item.label}
                  </p>
                  <p className={cn(
                    'text-xs',
                    isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
                  )}>
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </nav>
        
        <Separator className="mb-4" />
        
        <p className="text-xs font-medium text-muted-foreground mb-2">PREFERENCES</p>
        <nav className="space-y-1">
          {settingsItems.map(item => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  'w-full flex items-start gap-3 px-3 py-2 rounded-lg text-left transition-colors',
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted'
                )}
              >
                <Icon className={cn('h-5 w-5 mt-0.5 flex-shrink-0', isActive ? 'text-primary-foreground' : 'text-muted-foreground')} />
                <div className="flex-1 min-w-0">
                  <p className={cn('text-sm font-medium', isActive && 'text-primary-foreground')}>
                    {item.label}
                  </p>
                  <p className={cn(
                    'text-xs',
                    isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
                  )}>
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
      
      {/* Footer */}
      <div className="mt-auto pt-4">
        <Separator className="mb-4" />
        <div className="text-xs text-muted-foreground text-center">
          Workday Admin Panel
        </div>
      </div>
    </aside>
  );
}

