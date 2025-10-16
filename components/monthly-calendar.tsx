'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  addDays, 
  addMonths,
  isSameMonth,
  isToday,
  isSameDay
} from 'date-fns';
import { WorkLocation, DaySchedule } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Building2, Home } from 'lucide-react';

interface MonthlyCalendarProps {
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
  schedule: DaySchedule[];
  isEditable?: boolean;
  onLocationChange?: (date: Date, location: WorkLocation) => void;
}

export function MonthlyCalendar({ 
  currentMonth, 
  onMonthChange, 
  schedule,
  isEditable = false,
  onLocationChange
}: MonthlyCalendarProps) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  
  const days: Date[] = [];
  let day = calendarStart;
  while (day <= calendarEnd) {
    days.push(day);
    day = addDays(day, 1);
  }
  
  const handlePrevMonth = () => {
    onMonthChange(addMonths(currentMonth, -1));
  };
  
  const handleNextMonth = () => {
    onMonthChange(addMonths(currentMonth, 1));
  };
  
  const handleCurrentMonth = () => {
    onMonthChange(new Date());
  };
  
  const getLocationForDate = (date: Date): WorkLocation | null => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const daySchedule = schedule.find(s => s.date === dateStr);
    return daySchedule?.location || null;
  };
  
  const handleDayClick = (date: Date) => {
    if (!isEditable || !onLocationChange || !isSameMonth(date, currentMonth)) return;
    
    const currentLocation = getLocationForDate(date);
    const newLocation: WorkLocation = currentLocation === 'office' ? 'home' : 'office';
    onLocationChange(date, newLocation);
  };
  
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const isCurrentMonth = isSameMonth(currentMonth, new Date());
  
  return (
    <div>
      {/* Month Navigation */}
      <div className="flex items-center justify-center mb-6 relative">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex flex-col items-center min-w-[200px]">
            <div className="text-lg font-semibold">
              {format(currentMonth, 'MMMM yyyy')}
            </div>
            {isCurrentMonth && (
              <div className="text-xs text-muted-foreground">Current Month</div>
            )}
          </div>
          
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        {!isCurrentMonth && (
          <Button variant="outline" onClick={handleCurrentMonth} className="absolute right-0">
            Go to Current Month
          </Button>
        )}
      </div>
      
      {/* Calendar Grid */}
      <Card className="p-4">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {days.map(day => {
            const isCurrentDay = isToday(day);
            const isCurrentMonthDay = isSameMonth(day, currentMonth);
            const location = getLocationForDate(day);
            const isWeekend = day.getDay() === 0 || day.getDay() === 6;
            
            return (
              <button
                key={day.toISOString()}
                onClick={() => handleDayClick(day)}
                disabled={!isEditable || !isCurrentMonthDay}
                className={cn(
                  'aspect-square p-2 rounded-lg border transition-all',
                  'flex flex-col items-center justify-between',
                  isCurrentDay && 'ring-2 ring-primary',
                  !isCurrentMonthDay && 'opacity-40',
                  isWeekend && isCurrentMonthDay && 'bg-muted/30',
                  isEditable && isCurrentMonthDay && 'hover:border-primary cursor-pointer',
                  !isEditable && 'cursor-default'
                )}
              >
                <div className={cn(
                  'text-sm font-medium',
                  isCurrentDay ? 'text-primary font-bold' : isCurrentMonthDay ? 'text-foreground' : 'text-muted-foreground'
                )}>
                  {format(day, 'd')}
                </div>
                
                {location && isCurrentMonthDay && (
                  <div className={cn(
                    'w-full py-0.5 px-1 rounded text-center flex items-center justify-center',
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
                )}
              </button>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <Building2 className="h-3 w-3 text-primary-foreground" />
            </div>
            <span className="text-muted-foreground">Office</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-6 h-6 rounded bg-muted flex items-center justify-center">
              <Home className="h-3 w-3 text-muted-foreground" />
            </div>
            <span className="text-muted-foreground">Home</span>
          </div>
        </div>
      </Card>
    </div>
  );
}


