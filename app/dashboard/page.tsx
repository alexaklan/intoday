'use client';

import { useState, useEffect, useRef } from 'react';
import { WeekSelector } from '@/components/week-selector';
import { DayCard } from '@/components/day-card';
import { TeamMemberCard } from '@/components/team-member-card';
import { TeamSelector } from '@/components/team-selector';
import { MonthlyCalendar } from '@/components/monthly-calendar';
import { ProtectedRoute } from '@/components/protected-route';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getUserSchedulesForWeek, getTeamsByOrganisation, getUsersByOrganisation, User as DatabaseUser } from '@/lib/database-service';
import { WorkLocation, DaySchedule, Team as ComponentTeam, User as ComponentUser } from '@/lib/types';
import { startOfWeek, addDays, format, isSameWeek } from 'date-fns';
import { Calendar, CalendarDays, Grid3X3, List } from 'lucide-react';
import { useAuth } from '@/components/auth-provider';
import gsap from 'gsap';

export default function Dashboard() {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [teamViewMode, setTeamViewMode] = useState<'grid' | 'list'>('grid');
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [userSchedule, setUserSchedule] = useState<DaySchedule[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');
  const [teams, setTeams] = useState<ComponentTeam[]>([]);
  const [teamMembers, setTeamMembers] = useState<ComponentUser[]>([]);

  // Load user schedules from database
  const loadUserSchedules = async () => {
    if (!user) return;
    
    try {
      const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
      const schedules = await getUserSchedulesForWeek(user.id, weekStart);
      setUserSchedule(schedules.map(schedule => ({
        date: format(schedule.date, 'yyyy-MM-dd'),
        location: schedule.location
      })));
    } catch (error) {
      console.error('Error loading user schedules:', error);
    }
  };

  // Load teams for the user's organisation
  const loadTeams = async () => {
    if (!user) return;
    
    try {
      const userTeams = await getTeamsByOrganisation(user.organisationId);
      // Convert database teams to component teams
      const componentTeams: ComponentTeam[] = userTeams.map(team => ({
        id: team.id,
        name: team.name,
        organisationId: team.organisationId,
        memberIds: [] // We'll populate this separately if needed
      }));
      setTeams(componentTeams);
    } catch (error) {
      console.error('Error loading teams:', error);
    }
  };

  // Load team members for selected team
  const loadTeamMembers = async () => {
    if (!selectedTeamId || !user) return;
    
    try {
      const allUsers = await getUsersByOrganisation(user.organisationId);
      // Filter users who belong to the selected team
      const members = allUsers.filter(u => u.teamIds?.includes(selectedTeamId));
      // Convert database users to component users
      const componentUsers: ComponentUser[] = members.map(member => ({
        id: member.id,
        name: member.name,
        email: member.email,
        role: member.role,
        organisationId: member.organisationId,
        teamIds: member.teamIds || [],
        schedule: [] // We'll load this separately if needed
      }));
      setTeamMembers(componentUsers);
    } catch (error) {
      console.error('Error loading team members:', error);
    }
  };

  // Initialize user data when user is available
  useEffect(() => {
    if (user) {
      loadUserSchedules();
      loadTeams();
      
      // Set default team if user has teams
      if (user.teamIds.length > 0 && !selectedTeamId) {
        setSelectedTeamId(user.teamIds[0]);
      }
    }
  }, [user, currentWeek]);

  // Load team members when selected team changes
  useEffect(() => {
    loadTeamMembers();
  }, [selectedTeamId]);
  
  const weekDatesRef = useRef<HTMLDivElement>(null);
  const teamMembersRef = useRef<HTMLDivElement>(null);
  
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDates = Array.from({ length: 5 }, (_, i) => addDays(weekStart, i));
  
  const selectedTeam = teams.find(t => t.id === selectedTeamId);
  
  useEffect(() => {
    if (weekDatesRef.current) {
      const cards = weekDatesRef.current.children;
      gsap.fromTo(
        cards,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power2.out'
        }
      );
    }
  }, [currentWeek]);
  
  useEffect(() => {
    if (teamMembersRef.current) {
      const cards = teamMembersRef.current.children;
      gsap.fromTo(
        cards,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out'
        }
      );
    }
  }, [selectedTeamId, teamMembers]);
  
  const handleLocationChange = async (date: Date, location: WorkLocation) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    setUserSchedule(prev => {
      const existing = prev.find(s => s.date === dateStr);
      if (existing) {
        return prev.map(s => s.date === dateStr ? { ...s, location } : s);
      } else {
        return [...prev, { date: dateStr, location }];
      }
    });
    
    // Reload schedules from database to ensure consistency
    setTimeout(() => {
      loadUserSchedules();
    }, 100);
  };
  
  const getLocationForDate = (date: Date): WorkLocation => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const schedule = userSchedule.find(s => s.date === dateStr);
    return schedule?.location || 'home';
  };
  
  const isCurrentWeekView = isSameWeek(currentWeek, new Date(), { weekStartsOn: 1 });
  
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-background">
        <div className="container mx-auto py-8 px-6 max-w-[1600px]">
        
        {/* My Schedule Section */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">My Schedule</h2>
              {viewMode === 'week' && isCurrentWeekView && (
                <Badge variant="default" className="ml-2">This Week</Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('week')}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Week
              </Button>
              <Button
                variant={viewMode === 'month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('month')}
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                Month
              </Button>
            </div>
          </div>
          
          {viewMode === 'week' ? (
            <>
              <WeekSelector currentWeek={currentWeek} onWeekChange={setCurrentWeek} />
              <div ref={weekDatesRef} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {weekDates.map((date) => (
                  <DayCard
                    key={date.toISOString()}
                    date={date}
                    location={getLocationForDate(date)}
                    isEditable={true}
                    userId={user?.id}
                    onLocationChange={handleLocationChange}
                  />
                ))}
              </div>
            </>
          ) : (
            <MonthlyCalendar
              currentMonth={currentMonth}
              onMonthChange={setCurrentMonth}
              schedule={userSchedule}
              isEditable={true}
              userId={user?.id}
              onLocationChange={handleLocationChange}
            />
          )}
        </Card>
        
        {/* Team Members Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Team Members</h2>
            
            <div className="flex items-center gap-2">
              <Button
                variant={teamViewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTeamViewMode('grid')}
              >
                <Grid3X3 className="mr-2 h-4 w-4" />
                Grid
              </Button>
              <Button
                variant={teamViewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTeamViewMode('list')}
              >
                <List className="mr-2 h-4 w-4" />
                List
              </Button>
            </div>
          </div>
          
          {/* Team Selector - Clean placement */}
          {user && user.teamIds.length > 1 && (
            <div className="mb-6">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">Select Team</h3>
              <TeamSelector
                teams={teams.filter(t => user && user.teamIds.includes(t.id))}
                selectedTeamId={selectedTeamId}
                onTeamChange={setSelectedTeamId}
              />
            </div>
          )}
          
          {selectedTeam && (
            <div className="mb-4">
              <Badge variant="outline" className="text-sm">
                {selectedTeam.name} Team
              </Badge>
            </div>
          )}
          
          {teamMembers.length > 0 ? (
            teamViewMode === 'grid' ? (
              <div ref={teamMembersRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamMembers.map((member) => (
                  <TeamMemberCard
                    key={member.id}
                    user={member}
                    currentWeek={currentWeek}
                  />
                ))}
              </div>
            ) : (
              <div ref={teamMembersRef} className="space-y-3">
                {teamMembers.map((member) => (
                  <TeamMemberCard
                    key={member.id}
                    user={member}
                    currentWeek={currentWeek}
                    layout="list"
                  />
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No team members found.</p>
            </div>
          )}
        </Card>
        </div>
      </main>
    </ProtectedRoute>
  );
}

