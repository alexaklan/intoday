'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { WeekSelector } from '@/components/week-selector';
import { DayCard } from '@/components/day-card';
import { MonthlyCalendar } from '@/components/monthly-calendar';
import { AddUserToTeamDialog } from '@/components/add-user-to-team-dialog';
import { CreateTeamForm } from '@/components/create-team-form';
import { AddUserForm } from '@/components/add-user-form';
import { ProtectedRoute } from '@/components/protected-route';
import { WorkLocation, DaySchedule, User as UserType, Team as TeamType } from '@/lib/types';
import { getUserSchedulesForWeek, getUsersByOrganisation, getTeamsByOrganisation } from '@/lib/database-service';
import { Building, Users as UsersIcon, UserCog, Shield } from 'lucide-react';
import { startOfWeek, addDays, format } from 'date-fns';
import { useAuth } from '@/components/auth-provider';
import gsap from 'gsap';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'staff' | 'org_admin' | 'app_admin';
  organisationId: string;
  teamIds: string[];
}

interface Team {
  id: string;
  name: string;
  organisationId: string;
  memberCount: number;
}

export default function AdminPage() {
  const { user: currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('schedules');
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [userSchedules, setUserSchedules] = useState<Record<string, DaySchedule[]>>({});
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [userTeams, setUserTeams] = useState<Record<string, string[]>>({});
  
  // New state for real data
  const [users, setUsers] = useState<User[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);

  // Debug isAddingUser state changes
  useEffect(() => {
    console.log('isAddingUser state changed to:', isAddingUser);
  }, [isAddingUser]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch users and teams in parallel
        const [usersResponse, teamsResponse] = await Promise.all([
          fetch('/api/users'),
          fetch('/api/teams')
        ]);

        if (usersResponse.ok && teamsResponse.ok) {
          const usersData = await usersResponse.json();
          const teamsData = await teamsResponse.json();
          
          setUsers(usersData.users || []);
          setTeams(teamsData.teams || []);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  // Load schedules for all users
  const loadUserSchedules = async () => {
    if (!currentUser || users.length === 0) return;
    
    try {
      const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
      const schedulePromises = users.map(async (user) => {
        const schedules = await getUserSchedulesForWeek(user.id, weekStart);
        return { userId: user.id, schedules };
      });
      
      const scheduleResults = await Promise.all(schedulePromises);
      const scheduleMap: Record<string, DaySchedule[]> = {};
      
      scheduleResults.forEach(({ userId, schedules }) => {
        scheduleMap[userId] = schedules.map(schedule => ({
          date: format(schedule.date, 'yyyy-MM-dd'),
          location: schedule.location
        }));
      });
      
      setUserSchedules(scheduleMap);
    } catch (error) {
      console.error('Error loading user schedules:', error);
    }
  };

  // Load schedules when users or week changes
  useEffect(() => {
    loadUserSchedules();
  }, [users, currentWeek]);

  const handleCreateTeam = async (name: string, userIds: string[]) => {
    console.log('Admin handleCreateTeam called with:', { name, userIds });
    
    try {
      const response = await fetch('/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, userIds }),
      });

      console.log('Create team response:', response.status, response.ok);

      if (response.ok) {
        console.log('Team created successfully, refreshing data...');
        // Refresh teams data
        const teamsResponse = await fetch('/api/teams');
        if (teamsResponse.ok) {
          const teamsData = await teamsResponse.json();
          console.log('Refreshed teams data:', teamsData);
          setTeams(teamsData.teams || []);
        }
        setIsCreatingTeam(false);
      } else {
        const errorText = await response.text();
        console.error('Failed to create team:', response.status, errorText);
      }
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  const handleAddUser = async (name: string, email: string, role: string, teamIds: string[]) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, role, teamIds }),
      });

      if (response.ok) {
        // Refresh users data
        const usersResponse = await fetch('/api/users');
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          setUsers(usersData.users || []);
        }
        setIsAddingUser(false);
      } else {
        console.error('Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Convert database users to the format expected by components
  const convertUsersForComponents = (dbUsers: User[]): UserType[] => {
    return dbUsers.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      organisationId: user.organisationId,
      teamIds: user.teamIds,
      schedule: [], // Empty schedule for now
    }));
  };

  // Convert database teams to the format expected by components
  const convertTeamsForComponents = (dbTeams: Team[]): TeamType[] => {
    return dbTeams.map(team => ({
      id: team.id,
      name: team.name,
      organisationId: team.organisationId,
      memberIds: [], // We'll need to fetch this separately
    }));
  };

  const handleLocationChange = async (userId: string, dayIndex: number, location: WorkLocation) => {
    setUserSchedules(prev => ({
      ...prev,
      [userId]: prev[userId]?.map((schedule, index) => 
        index === dayIndex ? { ...schedule, location } : schedule
      ) || []
    }));
    
    // Reload schedules from database to ensure consistency
    setTimeout(() => {
      loadUserSchedules();
    }, 100);
  };

  const toggleUserExpanded = (userId: string) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getWeekDates = (weekStart: Date) => {
    return Array.from({ length: 5 }, (_, i) => addDays(weekStart, i));
  };

  const weekDates = getWeekDates(startOfWeek(currentWeek, { weekStartsOn: 1 }));

  if (loading) {
    return (
      <ProtectedRoute requiredRole="org_admin">
        <div className="container mx-auto px-6 py-8 max-w-[1600px]">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading admin data...</p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requiredRole="org_admin">
      <div className="container mx-auto px-6 py-8 max-w-[1600px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage your organisation&apos;s schedules, teams, and users
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-8">
          {[
            { id: 'schedules', label: 'Team Schedules', icon: Building },
            { id: 'teams', label: 'Teams', icon: UsersIcon },
            { id: 'users', label: 'Users', icon: UserCog },
            { id: 'calendar', label: 'Calendar View', icon: Building },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'schedules' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Team Schedules</h2>
              <WeekSelector currentWeek={currentWeek} onWeekChange={setCurrentWeek} />
            </div>

            <div className="grid gap-6">
              {users.map(user => (
                <Card key={user.id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <Badge variant={user.role === 'org_admin' ? 'default' : 'secondary'}>
                        {user.role === 'org_admin' ? 'Admin' : 'Staff'}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleUserExpanded(user.id)}
                    >
                      {expandedUserId === user.id ? 'Collapse' : 'Expand'}
                    </Button>
                  </div>

                  <div className="grid grid-cols-5 gap-4">
                    {weekDates.map((date, index) => (
                      <DayCard
                        key={index}
                        date={date}
                        location={userSchedules[user.id]?.[index]?.location || 'office'}
                        isEditable={true}
                        userId={user.id}
                        onLocationChange={(date, location) => handleLocationChange(user.id, index, location)}
                      />
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'teams' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Teams</h2>
              {!isCreatingTeam && (
                <Button onClick={() => setIsCreatingTeam(true)}>
                  Create Team
                </Button>
              )}
            </div>

            {isCreatingTeam ? (
              <CreateTeamForm
                users={convertUsersForComponents(users)}
                existingTeams={convertTeamsForComponents(teams)}
                organisationId={currentUser?.organisationId || ''}
                onSave={handleCreateTeam}
                onCancel={() => setIsCreatingTeam(false)}
              />
            ) : (
              <div className="grid gap-4">
                {teams.map(team => (
                  <Card key={team.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{team.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {team.memberCount} member{team.memberCount !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Users</h2>
              {!isAddingUser && (
                <Button onClick={() => {
                  console.log('Header Add User button clicked');
                  console.log('Current isAddingUser state:', isAddingUser);
                  setIsAddingUser(true);
                  console.log('Set isAddingUser to true');
                }}>
                  Add User
                </Button>
              )}
            </div>

            {isAddingUser ? (
              <AddUserForm
                teams={convertTeamsForComponents(teams)}
                users={convertUsersForComponents(users)}
                organisationId={currentUser?.organisationId || ''}
                onSave={(userData) => handleAddUser(`${userData.firstName} ${userData.lastName}`, userData.email, 'staff', userData.selectedTeamIds)}
                onCancel={() => setIsAddingUser(false)}
              />
            ) : (
              <div className="grid gap-4">
                {users.map(user => (
                  <Card key={user.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <Badge variant={user.role === 'org_admin' ? 'default' : 'secondary'} className="mt-1">
                            {user.role === 'org_admin' ? 'Admin' : 'Staff'}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Calendar View</h2>
            <MonthlyCalendar 
              currentMonth={new Date()}
              onMonthChange={() => {}}
              schedule={[]}
            />
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
