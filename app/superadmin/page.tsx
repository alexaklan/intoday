'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ProtectedRoute } from '@/components/protected-route';
import { SuperAdminNav } from '@/components/superadmin-nav';
import { 
  organisations, 
  teams, 
  users,
  getTeamsByOrganisation,
  getUsersByOrganisation
} from '@/lib/mock-data';
import { 
  Building2, 
  Users, 
  UserCog, 
  Shield, 
  CreditCard, 
  Settings, 
  BarChart3,
  Plus,
  Globe,
  Search,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import { useAuth } from '@/components/auth-provider';
import { cn } from '@/lib/utils';

export default function SuperAdminPage() {
  const { user: currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrgId, setSelectedOrgId] = useState<string>('');

  // Ensure only superadmin can access
  if (currentUser?.role !== 'app_admin') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">This page is only accessible to super administrators.</p>
        </Card>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const totalOrganisations = organisations.length;
  const totalUsers = users.length;
  const totalTeams = teams.length;
  const activeUsers = users.filter(u => u.role !== 'app_admin').length;

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-background">
        <div className="container mx-auto py-8 px-6 max-w-[1600px]">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                  <Shield className="h-8 w-8 text-primary" />
                  Super Admin Panel
                </h1>
                <p className="text-muted-foreground mt-1">
                  Manage the entire intoday application
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sm">
                  <Shield className="mr-1 h-3 w-3" />
                  Super Administrator
                </Badge>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building2 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Organisations</p>
                  <p className="text-2xl font-bold">{totalOrganisations}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{totalUsers}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <UserCog className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold">{activeUsers}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Building2 className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Teams</p>
                  <p className="text-2xl font-bold">{totalTeams}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sub Navigation */}
          <SuperAdminNav activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Main Content */}
          <div className="space-y-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Organisations */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Recent Organisations</h3>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {organisations.slice(0, 3).map(org => (
                      <div key={org.id} className="flex items-center gap-3 p-3 rounded-lg border">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{org.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {getUsersByOrganisation(org.id).length} users
                          </p>
                        </div>
                        <Badge variant="outline">Active</Badge>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Recent Users */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Recent Users</h3>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {users.slice(0, 3).map(user => (
                      <div key={user.id} className="flex items-center gap-3 p-3 rounded-lg border">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{user.name}</p>
                          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                        </div>
                        <Badge variant={user.role === 'org_admin' ? 'default' : 'secondary'}>
                          {user.role === 'org_admin' ? 'Admin' : 'User'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* Organisations Tab */}
            {activeTab === 'organisations' && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold">Organisations</h3>
                    <p className="text-muted-foreground">Manage all organisations in the system</p>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Organisation
                  </Button>
                </div>
                
                {/* Organisations Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Organisation</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Plan</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Users</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Teams</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {organisations.map(org => {
                        const orgUsers = getUsersByOrganisation(org.id);
                        const orgTeams = getTeamsByOrganisation(org.id);
                        const subdomain = `${org.name.toLowerCase().replace(/\s+/g, '-')}.intoday.io`;
                        
                        return (
                          <tr key={org.id} className="border-b hover:bg-muted/50 transition-colors">
                            {/* Organisation Column */}
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  <Building2 className="h-5 w-5 text-primary" />
                                </div>
                                <div className="min-w-0">
                                  <h4 className="font-semibold text-sm truncate">{org.name}</h4>
                                  <div className="flex items-center gap-1 mt-1">
                                    <Globe className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                                    <span className="text-xs text-muted-foreground truncate">{subdomain}</span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            
                            {/* Status Column */}
                            <td className="py-4 px-4">
                              <Badge variant="default" className="text-xs">
                                Active
                              </Badge>
                            </td>
                            
                            {/* Plan Column */}
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  Professional
                                </Badge>
                                <span className="text-xs text-muted-foreground">$29/month</span>
                              </div>
                            </td>
                            
                            {/* Users Column */}
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">{orgUsers.length}</span>
                              </div>
                            </td>
                            
                            {/* Teams Column */}
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">{orgTeams.length}</span>
                              </div>
                            </td>
                            
                            {/* Actions Column */}
                            <td className="py-4 px-4">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="outline" size="sm">
                                  <Settings className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold">All Users</h3>
                    <p className="text-muted-foreground">Manage users across all organisations</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 border rounded-md w-64"
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </div>
                </div>
                
                {/* Users Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">User</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Organisation</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Role</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Teams</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users
                        .filter(u => u.role !== 'app_admin')
                        .filter(user => 
                          searchQuery === '' || 
                          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map(user => {
                          const userOrg = organisations.find(o => o.id === user.organisationId);
                          const userTeams = teams.filter(t => user.teamIds.includes(t.id));
                          
                          return (
                            <tr key={user.id} className="border-b hover:bg-muted/50 transition-colors">
                              {/* User Column */}
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-10 w-10 flex-shrink-0">
                                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                                      {getInitials(user.name)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="min-w-0">
                                    <h4 className="font-semibold text-sm truncate">{user.name}</h4>
                                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                  </div>
                                </div>
                              </td>
                              
                              {/* Organisation Column */}
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-2">
                                  <Building2 className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm font-medium">{userOrg?.name || 'Unknown'}</span>
                                </div>
                              </td>
                              
                              {/* Role Column */}
                              <td className="py-4 px-4">
                                <Badge 
                                  variant={user.role === 'org_admin' ? 'default' : 'secondary'} 
                                  className="text-xs"
                                >
                                  {user.role === 'org_admin' ? 'Organisation Admin' : 'User'}
                                </Badge>
                              </td>
                              
                              {/* Teams Column */}
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm font-medium">{userTeams.length}</span>
                                  {userTeams.length > 0 && (
                                    <span className="text-xs text-muted-foreground">
                                      ({userTeams.map(t => t.name).join(', ')})
                                    </span>
                                  )}
                                </div>
                              </td>
                              
                              {/* Status Column */}
                              <td className="py-4 px-4">
                                <Badge variant="default" className="text-xs">
                                  Active
                                </Badge>
                              </td>
                              
                              {/* Actions Column */}
                              <td className="py-4 px-4">
                                <div className="flex items-center justify-end gap-2">
                                  <Button variant="outline" size="sm">
                                    View Details
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                
                {/* Empty State */}
                {users.filter(u => u.role !== 'app_admin').length === 0 && (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No users found</h3>
                    <p className="text-muted-foreground">
                      {searchQuery ? 'No users match your search criteria' : 'No users in the system yet'}
                    </p>
                  </div>
                )}
              </Card>
            )}

            {/* Subscriptions Tab */}
            {activeTab === 'subscriptions' && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold">Subscriptions</h3>
                    <p className="text-muted-foreground">Manage organisation subscriptions and billing</p>
                  </div>
                  <Button>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Add Plan
                  </Button>
                </div>
                
                <div className="text-center py-12">
                  <CreditCard className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Subscription Management</h3>
                  <p className="text-muted-foreground mb-4">
                    Subscription plans and billing management will be available here.
                  </p>
                  <Button variant="outline">Coming Soon</Button>
                </div>
              </Card>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold">Reports</h3>
                    <p className="text-muted-foreground">Analytics and reporting dashboard</p>
                  </div>
                  <Button>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                </div>
                
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
                  <p className="text-muted-foreground mb-4">
                    Comprehensive reporting and analytics will be available here.
                  </p>
                  <Button variant="outline">Coming Soon</Button>
                </div>
              </Card>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold">Application Settings</h3>
                    <p className="text-muted-foreground">Configure global application settings</p>
                  </div>
                  <Button>
                    <Settings className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
                
                <div className="text-center py-12">
                  <Settings className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Application Configuration</h3>
                  <p className="text-muted-foreground mb-4">
                    Global settings and configuration options will be available here.
                  </p>
                  <Button variant="outline">Coming Soon</Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
