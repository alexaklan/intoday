'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User, Team } from '@/lib/types';
import { X, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface AddUserToTeamDialogProps {
  user: User;
  allTeams: Team[];
  currentTeamIds: string[];
  onTeamsUpdate: (userId: string, teamIds: string[]) => void;
  onClose: () => void;
}

export function AddUserToTeamDialog({ 
  user, 
  allTeams, 
  currentTeamIds, 
  onTeamsUpdate,
  onClose 
}: AddUserToTeamDialogProps) {
  const [selectedTeams, setSelectedTeams] = useState<string[]>(currentTeamIds);
  const [selectedTeamToAdd, setSelectedTeamToAdd] = useState<string>('');
  
  const availableTeams = allTeams.filter(team => !selectedTeams.includes(team.id));
  
  const handleAddTeam = () => {
    if (selectedTeamToAdd && !selectedTeams.includes(selectedTeamToAdd)) {
      setSelectedTeams([...selectedTeams, selectedTeamToAdd]);
      setSelectedTeamToAdd('');
    }
  };
  
  const handleRemoveTeam = (teamId: string) => {
    setSelectedTeams(selectedTeams.filter(id => id !== teamId));
  };
  
  const handleSave = () => {
    onTeamsUpdate(user.id, selectedTeams);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-background p-6 max-w-md w-full">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">Manage Team Assignments</h3>
          <p className="text-sm text-muted-foreground">{user.name}</p>
        </div>
        
        <div className="space-y-4">
          {/* Current Teams */}
          <div>
            <label className="text-sm font-medium mb-2 block">Current Teams</label>
            {selectedTeams.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedTeams.map(teamId => {
                  const team = allTeams.find(t => t.id === teamId);
                  return team ? (
                    <Badge key={teamId} variant="secondary" className="flex items-center gap-1">
                      {team.name}
                      <button
                        onClick={() => handleRemoveTeam(teamId)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ) : null;
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No teams assigned</p>
            )}
          </div>
          
          {/* Add New Team */}
          {availableTeams.length > 0 && (
            <div>
              <label className="text-sm font-medium mb-2 block">Add to Team</label>
              <div className="flex gap-2">
                <Select value={selectedTeamToAdd} onValueChange={setSelectedTeamToAdd}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select a team..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTeams.map(team => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  onClick={handleAddTeam} 
                  size="icon"
                  disabled={!selectedTeamToAdd}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-2 mt-6">
          <Button onClick={handleSave} className="flex-1">
            Save Changes
          </Button>
          <Button onClick={onClose} variant="outline" className="flex-1">
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
}

