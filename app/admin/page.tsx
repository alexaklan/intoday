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
import { 
  organisations, 
  teams, 
  users,
  getTeamsByOrganisation,
  getUsersByOrganisation
} from '@/lib/mock-data';
import { WorkLocation, DaySchedule } from '@/lib/types';
import { Building, Users as UsersIcon, UserCog, Shield } from 'lucide-react';
import { startOfWeek, addDays, format } from 'date-fns';
import { useAuth } from '@/components/auth-provider';
import gsap from 'gsap';

export default function AdminPage() {
  const { user: currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('schedules');
  const [selectedOrgId, setSelectedOrgId] = useState<string>('');
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [userSchedules, setUserSchedules] = useState<Map<string, DaySchedule[]>>(
    new Map(users.map(u => [u.id, u.schedule]))
  );
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [userTeams, setUserTeams] = useState<Map<string, string[]>>(
    new Map(users.map(u => [u.id, u.teamIds]))
  );
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);

  // Initialize selectedOrgId when user is available
  useEffect(() => {
    if (currentUser) {
      setSelectedOrgId(currentUser.organisationId);
    }
  }, [currentUser]);
  
  const teamCardsRef = useRef<HTMLDivElement>(null);
  const userCardsRef = useRef<HTMLDivElement>(null);
  const scheduleCardsRef = useRef<HTMLDivElement>(null);
  
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDates = Array.from({ length: 5 }, (_, i) => addDays(weekStart, i));
  
  const selectedOrg = organisations.find(o => o.id === selectedOrgId);
  const orgTeams = getTeamsByOrganisation(selectedOrgId);
  const orgUsers = getUsersByOrganisation(selectedOrgId);
  
  const isOrgAdmin = currentUser?.role === 'org_admin';
  const isAppAdmin = currentUser?.role === 'app_admin';
  
  useEffect(() => {
    if (teamCardsRef.current) {
      const cards = teamCardsRef.current.children;
      gsap.fromTo(
        cards,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power2.out'
        }
      );
    }
  }, [selectedOrgId]);
  
  useEffect(() => {
    if (userCardsRef.current) {
      const cards = userCardsRef.current.children;
      gsap.fromTo(
        cards,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out'
        }
      );
    }
  }, [selectedOrgId]);
  
  useEffect(() => {
    if (scheduleCardsRef.current) {
      const cards = scheduleCardsRef.current.children;
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
  }, [selectedOrgId, currentWeek, expandedUserId]);
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  const handleLocationChange = (userId: string, date: Date, location: WorkLocation) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    setUserSchedules(prev => {
      const newMap = new Map(prev);
      const userSchedule = newMap.get(userId) || [];
      const existingIndex = userSchedule.findIndex(s => s.date === dateStr);
      
      if (existingIndex >= 0) {
        const newSchedule = [...userSchedule];
        newSchedule[existingIndex] = { date: dateStr, location };
        newMap.set(userId, newSchedule);
      } else {
        newMap.set(userId, [...userSchedule, { date: dateStr, location }]);
      }
      
      return newMap;
    });
  };
  
  const getLocationForDate = (userId: string, date: Date): WorkLocation => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const schedule = userSchedules.get(userId) || [];
    const daySchedule = schedule.find(s => s.date === dateStr);
    return daySchedule?.location || 'home';
  };
  
  const toggleUserExpanded = (userId: string) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };
  
  const handleTeamsUpdate = (userId: string, teamIds: string[]) => {
    setUserTeams(prev => {
      const newMap = new Map(prev);
      newMap.set(userId, teamIds);
      return newMap;
    });
    // In a real app, this would make an API call
    console.log('Updated teams for user', userId, 'to', teamIds);
  };

  const handleCreateTeam = (teamName: string, selectedUserIds: string[]) => {
    // In a real app, this would make an API call to create the team
    console.log('Creating team:', teamName, 'with users:', selectedUserIds);
    
    // For demo purposes, we'll just show a success message
    alert(`Team "${teamName}" created successfully with ${selectedUserIds.length} members!`);
    
    // Reset the form
    setIsCreatingTeam(false);
    
    // In a real implementation, you would:
    // 1. Call API to create team
    // 2. Update local state with new team
    // 3. Refresh the teams list
  };

  const handleAddUser = (userData: {
    firstName: string;
    lastName: string;
    email: string;
    selectedTeamIds: string[];
  }) => {
    // In a real app, this would make an API call to create the user
    console.log('Adding user:', userData);
    
    // For demo purposes, we'll just show a success message
    alert(`User "${userData.firstName} ${userData.lastName}" created successfully and assigned to ${userData.selectedTeamIds.length} team(s)!`);
    
    // Reset the form
    setIsAddingUser(false);
    
    // In a real implementation, you would:
    // 1. Call API to create user
    // 2. Update local state with new user
    // 3. Refresh the users list
  };
  
  
  // Get organisations the current user can manage
  const managedOrgs = isAppAdmin 
    ? organisations 
    : organisations.filter(org => org.adminIds.includes(currentUser?.id || ''));
  
  return (
    <ProtectedRoute requiredRole={isAppAdmin ? 'app_admin' : 'org_admin'}>
      <main className="min-h-screen bg-background">
        <div className="container mx-auto py-8 px-6 max-w-[1600px]">
          
          {/* Admin Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold">Admin Panel</h1>
                <p className="text-muted-foreground">Manage your organisation and teams</p>
              </div>
              
              {managedOrgs.length > 1 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Organisation:</span>
                  <select 
                    value={selectedOrgId} 
                    onChange={(e) => setSelectedOrgId(e.target.value)}
                    className="px-3 py-2 border rounded-md bg-background"
                  >
                    {managedOrgs.map(org => (
                      <option key={org.id} value={org.id}>
                        {org.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            
            {/* Tabs */}
            <div className="flex items-center gap-1 border-b">
              {[
                { id: 'schedules', label: 'Team Schedules' },
                { id: 'calendar', label: 'Calendar View' },
                { id: 'teams', label: 'Teams' },
                { id: 'users', label: 'Users' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Schedules Section */}
          {activeTab === 'schedules' && (
            <Card className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-1">Team Schedules</h2>
                {selectedOrg && (
                  <p className="text-sm text-muted-foreground">
                    View and manage schedules for {selectedOrg.name}
                  </p>
                )}
              </div>
              
              <WeekSelector currentWeek={currentWeek} onWeekChange={setCurrentWeek} />
              
              <div ref={scheduleCardsRef} className="space-y-3 mt-6">
                {orgUsers.map(user => {
                  const isExpanded = expandedUserId === user.id;
                  const userTeams = teams.filter(t => user.teamIds.includes(t.id));
                  
                  return (
                    <Card key={user.id} className="overflow-hidden transition-all hover:shadow-md">
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {getInitials(user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{user.name}</h3>
                                {user.role === 'org_admin' && (
                                  <Badge variant="outline" className="text-xs">Admin</Badge>
                                )}
                                {user.id === currentUser.id && (
                                  <Badge variant="secondary" className="text-xs">You</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                              {userTeams.length > 0 && (
                                <div className="flex gap-1 mt-1">
                                  {userTeams.map(team => (
                                    <Badge key={team.id} variant="secondary" className="text-xs">
                                      {team.name}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {/* Quick week view */}
                            <div className="hidden md:flex gap-1">
                              {weekDates.map(date => {
                                const location = getLocationForDate(user.id, date);
                                return (
                                  <div
                                    key={date.toISOString()}
                                    className={`w-8 h-8 rounded flex items-center justify-center text-xs font-medium ${
                                      location === 'office'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted text-muted-foreground'
                                    }`}
                                    title={`${format(date, 'EEE')}: ${location === 'office' ? 'Office' : 'Home'}`}
                                  >
                                    {format(date, 'EEE')[0]}
                                  </div>
                                );
                              })}
                            </div>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleUserExpanded(user.id)}
                            >
                              {isExpanded ? 'Hide Details' : 'Edit Schedule'}
                            </Button>
                          </div>
                        </div>
                        
                        {isExpanded && (
                          <div className="mt-6 pt-6 border-t">
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                              {weekDates.map(date => (
                                <DayCard
                                  key={date.toISOString()}
                                  date={date}
                                  location={getLocationForDate(user.id, date)}
                                  isEditable={true}
                                  onLocationChange={(date, location) => handleLocationChange(user.id, date, location)}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </Card>
          )}
          
          {/* Calendar View Section */}
          {activeTab === 'calendar' && (
            <div className="space-y-6">
              {/* User Selector */}
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">View schedule for:</span>
                  <div className="flex flex-wrap gap-2">
                    {orgUsers.map(user => (
                      <Button
                        key={user.id}
                        variant={selectedUserId === user.id ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedUserId(user.id)}
                      >
                        {user.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>
              
              {/* Calendar */}
              {selectedUserId ? (
                <Card className="p-6">
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg">
                      {users.find(u => u.id === selectedUserId)?.name}'s Schedule
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {users.find(u => u.id === selectedUserId)?.email}
                    </p>
                  </div>
                  <MonthlyCalendar
                    currentMonth={currentMonth}
                    onMonthChange={setCurrentMonth}
                    schedule={userSchedules.get(selectedUserId) || []}
                    isEditable={true}
                    onLocationChange={(date, location) => handleLocationChange(selectedUserId, date, location)}
                  />
                </Card>
              ) : (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">Select a user to view their calendar</p>
                </Card>
              )}
            </div>
          )}
          
          {/* Teams Section */}
          {activeTab === 'teams' && (
            <div className="space-y-6">
              {isCreatingTeam ? (
                <CreateTeamForm
                  onCancel={() => setIsCreatingTeam(false)}
                  onSave={handleCreateTeam}
                  users={users}
                  existingTeams={teams}
                  organisationId={selectedOrgId}
                />
              ) : (
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold">Teams</h2>
                      {selectedOrg && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Managing teams for {selectedOrg.name}
                        </p>
                      )}
                    </div>
                    {isOrgAdmin && (
                      <Button onClick={() => setIsCreatingTeam(true)}>
                        Create Team
                      </Button>
                    )}
                  </div>
                  
                  {orgTeams.length > 0 ? (
                    <div ref={teamCardsRef} className="space-y-3">
                      {orgTeams.map(team => {
                        const teamMembers = users.filter(u => u.teamIds.includes(team.id));
                        return (
                          <Card key={team.id} className="p-4 hover:shadow-md transition-all">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                  <UsersIcon className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-lg">{team.name}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {teamMembers.length} {teamMembers.length === 1 ? 'member' : 'members'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                  {teamMembers.slice(0, 3).map(member => (
                                    <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                        {getInitials(member.name)}
                                      </AvatarFallback>
                                    </Avatar>
                                  ))}
                                  {teamMembers.length > 3 && (
                                    <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                                      <span className="text-xs font-medium">+{teamMembers.length - 3}</span>
                                    </div>
                                  )}
                                </div>
                                {isOrgAdmin && (
                                  <Button variant="outline" size="sm">Manage</Button>
                                )}
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <UsersIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No teams found for this organisation.</p>
                      {isOrgAdmin && (
                        <Button className="mt-4" onClick={() => setIsCreatingTeam(true)}>
                          Create First Team
                        </Button>
                      )}
                    </div>
                  )}
                </Card>
              )}
            </div>
          )}
          
          {/* Users Section */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              {isAddingUser ? (
                <AddUserForm
                  onCancel={() => setIsAddingUser(false)}
                  onSave={handleAddUser}
                  users={users}
                  teams={teams}
                  organisationId={selectedOrgId}
                />
              ) : (
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold">Users</h2>
                      {selectedOrg && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Managing users for {selectedOrg.name}
                        </p>
                      )}
                    </div>
                    {isOrgAdmin && (
                      <Button onClick={() => setIsAddingUser(true)}>
                        Add User
                      </Button>
                    )}
                  </div>
              
              <div ref={userCardsRef} className="space-y-2">
                {orgUsers.map(user => {
                  const currentUserTeamIds = userTeams.get(user.id) || user.teamIds;
                  const userTeamsList = teams.filter(t => currentUserTeamIds.includes(t.id));
                  return (
                    <Card key={user.id} className="p-4 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{user.name}</h3>
                              {user.role === 'org_admin' && (
                                <Badge variant="outline" className="text-xs">Admin</Badge>
                              )}
                              {user.id === currentUser.id && (
                                <Badge variant="secondary" className="text-xs">You</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            {userTeamsList.length > 0 ? (
                              <div className="flex gap-1 mt-1">
                                {userTeamsList.map(team => (
                                  <Badge key={team.id} variant="secondary" className="text-xs">
                                    {team.name}
                                  </Badge>
                                ))}
                              </div>
                            ) : (
                              <p className="text-xs text-muted-foreground mt-1">No teams assigned</p>
                            )}
                          </div>
                        </div>
                        {isOrgAdmin && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setEditingUserId(user.id)}
                          >
                            Manage Teams
                          </Button>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
                </Card>
              )}
            </div>
          )}
        </div>
        
        {/* Add User to Team Dialog */}
        {editingUserId && (() => {
          const user = users.find(u => u.id === editingUserId);
          const currentTeamIds = userTeams.get(editingUserId) || [];
          return user ? (
            <AddUserToTeamDialog
              user={user}
              allTeams={orgTeams}
              currentTeamIds={currentTeamIds}
              onTeamsUpdate={handleTeamsUpdate}
              onClose={() => setEditingUserId(null)}
            />
          ) : null;
        })()}

        
      </main>
    </ProtectedRoute>
  );
}

