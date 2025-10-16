'use client';

import { Button } from '@/components/ui/button';
import { Team } from '@/lib/types';
import { cn } from '@/lib/utils';

interface TeamSelectorProps {
  teams: Team[];
  selectedTeamId: string;
  onTeamChange: (teamId: string) => void;
}

export function TeamSelector({ teams, selectedTeamId, onTeamChange }: TeamSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      {teams.map((team) => (
        <Button
          key={team.id}
          variant={selectedTeamId === team.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onTeamChange(team.id)}
          className={cn(
            "transition-all duration-200 font-medium",
            selectedTeamId === team.id 
              ? "shadow-md scale-105" 
              : "hover:scale-105 hover:shadow-sm"
          )}
        >
          {team.name}
        </Button>
      ))}
    </div>
  );
}