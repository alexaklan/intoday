'use client';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, WorkLocation } from '@/lib/types';
import { format, isToday, startOfWeek, addDays } from 'date-fns';
import { Building2, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TeamMemberCardProps {
  user: User;
  currentWeek: Date;
  isCurrentUser?: boolean;
  layout?: 'grid' | 'list';
}

export function TeamMemberCard({ user, currentWeek, isCurrentUser, layout = 'grid' }: TeamMemberCardProps) {
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDates = Array.from({ length: 5 }, (_, i) => addDays(weekStart, i));
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  const getLocationForDate = (date: Date): WorkLocation => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const schedule = user.schedule.find(s => s.date === dateStr);
    return schedule?.location || 'home';
  };

  if (layout === 'list') {
    return (
      <Card className={cn(
        'p-4 transition-all duration-300 hover:shadow-md',
        isCurrentUser && 'ring-2 ring-primary'
      )}>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-base truncate">{user.name}</h3>
              {isCurrentUser && (
                <Badge variant="secondary" className="text-xs">You</Badge>
              )}
              {user.role === 'org_admin' && (
                <Badge variant="outline" className="text-xs">Admin</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate">{user.email}</p>
          </div>
          
          <div className="flex gap-2">
            {weekDates.map((date) => {
              const location = getLocationForDate(date);
              const isCurrentDay = isToday(date);
              return (
                <div
                  key={date.toISOString()}
                  className={cn(
                    'flex flex-col items-center border rounded-lg p-2 transition-all min-w-[60px]',
                    isCurrentDay && 'ring-2 ring-primary'
                  )}
                >
                  <div className="text-center mb-1">
                    <div className={cn(
                      'text-xs font-medium',
                      isCurrentDay ? 'text-primary font-bold' : 'text-muted-foreground'
                    )}>
                      {format(date, 'EEE')}
                    </div>
                    <div className={cn(
                      'text-sm font-semibold',
                      isCurrentDay ? 'text-primary font-bold' : 'text-foreground'
                    )}>
                      {format(date, 'd')}
                    </div>
                  </div>
                  
                  <div className={cn(
                    'w-full py-1 px-2 rounded text-center flex items-center justify-center',
                    location === 'office'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  )}>
                    {location === 'office' ? (
                      <Building2 className="h-3 w-3" />
                    ) : (
                      <Home className="h-3 w-3" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    );
  }

  // Grid layout (default)
  return (
    <Card className={cn(
      'p-4 transition-all duration-300 hover:shadow-md',
      isCurrentUser && 'ring-2 ring-primary'
    )}>
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-primary text-primary-foreground">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm truncate">{user.name}</h3>
            {isCurrentUser && (
              <Badge variant="secondary" className="text-xs">You</Badge>
            )}
            {user.role === 'org_admin' && (
              <Badge variant="outline" className="text-xs">Admin</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
        </div>
      </div>
      
      <div className="mt-3 flex gap-2">
        {weekDates.map((date) => {
          const location = getLocationForDate(date);
          const isCurrentDay = isToday(date);
          return (
            <div
              key={date.toISOString()}
              className={cn(
                'flex-1 border rounded-md p-2 transition-all',
                isCurrentDay && 'ring-2 ring-primary'
              )}
            >
              <div className="flex flex-col items-center space-y-1">
                <div className="text-center">
                  <div className={cn(
                    'text-xs font-medium',
                    isCurrentDay ? 'text-primary font-bold' : 'text-muted-foreground'
                  )}>
                    {format(date, 'EEE')}
                  </div>
                  <div className={cn(
                    'text-xs',
                    isCurrentDay ? 'text-primary font-bold' : 'text-foreground'
                  )}>
                    {format(date, 'd')}
                  </div>
                </div>
                
                <div className={cn(
                  'w-full py-1 px-2 rounded text-center flex items-center justify-center',
                  location === 'office'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}>
                  {location === 'office' ? (
                    <Building2 className="h-3 w-3" />
                  ) : (
                    <Home className="h-3 w-3" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}