'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addWeeks, startOfWeek, addDays, isSameWeek } from 'date-fns';

interface WeekSelectorProps {
  currentWeek: Date;
  onWeekChange: (date: Date) => void;
}

export function WeekSelector({ currentWeek, onWeekChange }: WeekSelectorProps) {
  const today = new Date();
  const isCurrentWeek = isSameWeek(currentWeek, today, { weekStartsOn: 1 });
  
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekEnd = addDays(weekStart, 4); // Friday
  
  const handlePrevWeek = () => {
    onWeekChange(addWeeks(currentWeek, -1));
  };
  
  const handleNextWeek = () => {
    onWeekChange(addWeeks(currentWeek, 1));
  };
  
  const handleCurrentWeek = () => {
    onWeekChange(today);
  };
  
  return (
    <div className="flex items-center justify-center mb-6 relative">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevWeek}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex flex-col items-center min-w-[280px]">
          <div className="text-lg font-semibold">
            {format(weekStart, 'd MMM')} - {format(weekEnd, 'd MMM yyyy')}
          </div>
          {isCurrentWeek && (
            <div className="text-xs text-muted-foreground">Current Week</div>
          )}
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextWeek}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {!isCurrentWeek && (
        <Button
          variant="outline"
          onClick={handleCurrentWeek}
          className="absolute right-0"
        >
          Go to Current Week
        </Button>
      )}
    </div>
  );
}

