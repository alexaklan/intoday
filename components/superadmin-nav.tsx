'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Building2, 
  Users, 
  CreditCard, 
  Settings, 
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SuperAdminNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'organisations', label: 'Organisations', icon: Building2 },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function SuperAdminNav({ activeTab, onTabChange }: SuperAdminNavProps) {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-6 max-w-[1600px]">
        <nav className="flex items-center gap-1 py-4">
          <div className="flex items-center gap-2 mr-6">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-medium text-sm text-muted-foreground">Super Admin</span>
          </div>
          
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    'h-9 px-4',
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
