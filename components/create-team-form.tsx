'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, Team } from '@/lib/types';
import { Users, X, ArrowLeft, Save, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CreateTeamFormProps {
  onCancel: () => void;
  onSave: (teamName: string, selectedUserIds: string[]) => void;
  users: User[];
  existingTeams: Team[];
  organisationId: string;
}

export function CreateTeamForm({
  onCancel,
  onSave,
  users,
  existingTeams,
  organisationId
}: CreateTeamFormProps) {
  const [teamName, setTeamName] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  // Filter users by organisation and search query
  const filteredUsers = users.filter(user => 
    user.organisationId === organisationId &&
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Check for duplicate team names
  const isDuplicateName = existingTeams.some(team => 
    team.name.toLowerCase() === teamName.toLowerCase().trim()
  );

  // Validation
  useEffect(() => {
    const newErrors: string[] = [];
    
    if (teamName.trim().length === 0) {
      newErrors.push('Team name is required');
    } else if (isDuplicateName) {
      newErrors.push('A team with this name already exists');
    }
    
    if (selectedUserIds.length === 0) {
      newErrors.push('At least one team member is required');
    }
    
    setErrors(newErrors);
  }, [teamName, isDuplicateName, selectedUserIds]);

  const handleUserToggle = (userId: string) => {
    setSelectedUserIds(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSave = () => {
    if (errors.length === 0 && teamName.trim()) {
      onSave(teamName.trim(), selectedUserIds);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Teams
          </Button>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Create New Team</h2>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Team Details */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="teamName" className="text-sm font-medium">
                  Team Name
                </Label>
                <Input
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter team name..."
                  className={cn(
                    'mt-1',
                    isDuplicateName && teamName.trim() && 'border-red-500 focus:border-red-500'
                  )}
                />
                {isDuplicateName && teamName.trim() && (
                  <p className="text-sm text-red-500 mt-1">This team name already exists</p>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium">Team Members</Label>
                <div className="mt-1 text-sm text-muted-foreground">
                  {selectedUserIds.length} member{selectedUserIds.length !== 1 ? 's' : ''} selected
                </div>
              </div>

              {/* Selected Users Preview */}
              {selectedUserIds.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Selected Members</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedUserIds.map(userId => {
                      const user = users.find(u => u.id === userId);
                      if (!user) return null;
                      return (
                        <div key={userId} className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{user.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                          </div>
                          <button
                            onClick={() => handleUserToggle(userId)}
                            className="text-muted-foreground hover:text-foreground p-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Error Messages */}
          {errors.length > 0 && (
            <Alert variant="destructive">
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((error, index) => (
                    <li key={index} className="text-sm">{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Right Column - User Selection */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Available Users
                </Label>
                <Input
                  placeholder="Search users by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-4"
                />
              </div>

              {/* User List */}
              <div className="border rounded-lg max-h-96 overflow-y-auto">
                {filteredUsers.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>{searchQuery ? 'No users found matching your search' : 'No users available'}</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredUsers.map(user => (
                      <div key={user.id} className="p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors">
                        <Checkbox
                          id={user.id}
                          checked={selectedUserIds.includes(user.id)}
                          onCheckedChange={() => handleUserToggle(user.id)}
                        />
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium truncate">{user.name}</p>
                            {user.role === 'org_admin' && (
                              <Badge variant="outline" className="text-xs">Admin</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          onClick={handleSave}
          disabled={errors.length > 0 || !teamName.trim()}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Create Team
        </Button>
      </div>
    </div>
  );
}
