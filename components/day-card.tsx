'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WorkLocation } from '@/lib/types';
import { format, isToday, isPast, isSameDay } from 'date-fns';
import { Building2, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DayCardProps {
  date: Date;
  location: WorkLocation;
  isEditable: boolean;
  userId?: string;
  onLocationChange?: (date: Date, location: WorkLocation) => void;
}

export function DayCard({ date, location, isEditable, userId, onLocationChange }: DayCardProps) {
  const isDateToday = isToday(date);
  const isDatePast = isPast(date) && !isDateToday;
  
  const handleToggle = async () => {
    if (!isEditable) return;
    
    const newLocation: WorkLocation = location === 'office' ? 'home' : 'office';
    
    // Call the parent callback first for immediate UI update
    if (onLocationChange) {
      onLocationChange(date, newLocation);
    }
    
    // Save to database if userId is provided
    if (userId) {
      try {
        const response = await fetch('/api/schedules', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            date: date.toISOString().split('T')[0], // YYYY-MM-DD format
            location: newLocation,
          }),
        });

        if (!response.ok) {
          console.error('Failed to save schedule to database');
          // Optionally revert the UI change here
        }
      } catch (error) {
        console.error('Error saving schedule:', error);
      }
    }
  };
  
  return (
    <Card
      className={cn(
        'p-4 transition-all duration-300 hover:shadow-md',
        isDateToday && 'ring-2 ring-primary',
        isDatePast && 'opacity-60'
      )}
    >
      <div className="flex flex-col items-center space-y-3">
        <div className="text-center">
          <div className="text-sm font-medium text-muted-foreground">
            {format(date, 'EEE')}
          </div>
          <div className="text-2xl font-bold">
            {format(date, 'd')}
          </div>
          <div className="text-xs text-muted-foreground">
            {format(date, 'MMM')}
          </div>
        </div>
        
        {isEditable ? (
          <Button
            variant={location === 'office' ? 'default' : 'outline'}
            size="lg"
            onClick={handleToggle}
            className="w-full"
          >
            {location === 'office' ? (
              <>
                <Building2 className="mr-2 h-4 w-4" />
                Office
              </>
            ) : (
              <>
                <Home className="mr-2 h-4 w-4" />
                Home
              </>
            )}
          </Button>
        ) : (
          <div
            className={cn(
              'w-full py-2 px-4 rounded-md text-center font-medium flex items-center justify-center',
              location === 'office'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            )}
          >
            {location === 'office' ? (
              <>
                <Building2 className="mr-2 h-4 w-4" />
                Office
              </>
            ) : (
              <>
                <Home className="mr-2 h-4 w-4" />
                Home
              </>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

