'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, Team } from '@/lib/types';
import { UserPlus, ArrowLeft, Save, Mail, User as UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddUserFormProps {
  onCancel: () => void;
  onSave: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    selectedTeamIds: string[];
  }) => void;
  users: User[];
  teams: Team[];
  organisationId: string;
}

export function AddUserForm({
  onCancel,
  onSave,
  users,
  teams,
  organisationId
}: AddUserFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTeamIds, setSelectedTeamIds] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  // Filter teams by organisation
  const orgTeams = teams.filter(team => team.organisationId === organisationId);

  // Check for duplicate email
  const isDuplicateEmail = users.some(user => 
    user.email.toLowerCase() === email.toLowerCase().trim()
  );

  // Validation
  useEffect(() => {
    const newErrors: string[] = [];
    
    if (email.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.push('Please enter a valid email address');
    }
    
    if (isDuplicateEmail) {
      newErrors.push('A user with this email already exists');
    }
    
    setErrors(newErrors);
  }, [email, isDuplicateEmail]);

  const handleTeamToggle = (teamId: string) => {
    setSelectedTeamIds(prev => 
      prev.includes(teamId) 
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId]
    );
  };

  const handleSave = () => {
    if (errors.length === 0 && firstName.trim() && lastName.trim() && email.trim()) {
      onSave({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        selectedTeamIds
      });
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();
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
            Back to Users
          </Button>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Add New User</h2>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - User Details */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              {/* User Preview */}
              {(firstName || lastName || email) && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">User Preview</Label>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {getInitials(firstName, lastName)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">
                        {firstName && lastName ? `${firstName} ${lastName}` : 'New User'}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {email || 'email@example.com'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* User Details Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter first name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter last name"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className={cn(
                      'mt-1',
                      isDuplicateEmail && email.trim() && 'border-red-500 focus:border-red-500'
                    )}
                  />
                  {isDuplicateEmail && email.trim() && (
                    <p className="text-sm text-red-500 mt-1">This email is already in use</p>
                  )}
                </div>
              </div>

              {/* Selected Teams Preview */}
              {selectedTeamIds.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Assigned Teams</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedTeamIds.map(teamId => {
                      const team = orgTeams.find(t => t.id === teamId);
                      if (!team) return null;
                      return (
                        <div key={teamId} className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                          <UserIcon className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{team.name}</p>
                          </div>
                          <button
                            onClick={() => handleTeamToggle(teamId)}
                            className="text-muted-foreground hover:text-foreground p-1"
                          >
                            ×
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

        {/* Right Column - Team Selection */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Assign to Teams
                </Label>
                <p className="text-sm text-muted-foreground mb-4">
                  Select which teams this user should be part of. Users can be assigned to multiple teams.
                </p>
              </div>

              {/* Team List */}
              <div className="border rounded-lg max-h-96 overflow-y-auto">
                {orgTeams.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <UserIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No teams available in this organisation</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {orgTeams.map(team => {
                      const teamMembers = users.filter(u => u.teamIds.includes(team.id));
                      return (
                        <div key={team.id} className="p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors">
                          <Checkbox
                            id={team.id}
                            checked={selectedTeamIds.includes(team.id)}
                            onCheckedChange={() => handleTeamToggle(team.id)}
                          />
                          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <UserIcon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium truncate">{team.name}</p>
                              <Badge variant="outline" className="text-xs">
                                {teamMembers.length} member{teamMembers.length !== 1 ? 's' : ''}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              Team in {team.organisationId}
                            </p>
                          </div>
                        </div>
                      );
                    })}
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
          disabled={errors.length > 0 || !firstName.trim() || !lastName.trim() || !email.trim() || selectedTeamIds.length === 0}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Add User
        </Button>
      </div>
    </div>
  );
}
