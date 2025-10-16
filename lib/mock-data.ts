import { Organisation, Team, User, DaySchedule } from './types';
import { addDays, format } from 'date-fns';

// Generate schedules for the next 4 weeks
function generateSchedule(userId: string, pattern: ('office' | 'home')[]): DaySchedule[] {
  const schedule: DaySchedule[] = [];
  const today = new Date();
  
  for (let week = 0; week < 4; week++) {
    for (let day = 0; day < 5; day++) { // Monday to Friday
      const date = addDays(today, week * 7 + day);
      schedule.push({
        date: format(date, 'yyyy-MM-dd'),
        location: pattern[day % pattern.length]
      });
    }
  }
  
  return schedule;
}

export const organisations: Organisation[] = [
  {
    id: 'org-1',
    name: 'Tech Solutions Ltd',
    adminIds: ['user-1']
  },
  {
    id: 'org-2',
    name: 'Creative Agency Co',
    adminIds: ['user-1', 'user-6']
  }
];

export const teams: Team[] = [
  {
    id: 'team-1',
    name: 'Development',
    organisationId: 'org-1',
    memberIds: ['user-2', 'user-3', 'user-4', 'user-5']
  },
  {
    id: 'team-2',
    name: 'Leadership',
    organisationId: 'org-1',
    memberIds: ['user-5', 'user-7']
  },
  {
    id: 'team-3',
    name: 'Design',
    organisationId: 'org-2',
    memberIds: ['user-8', 'user-9']
  }
];

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Alice Johnson',
    email: 'alice@techsolutions.com',
    role: 'org_admin',
    organisationId: 'org-1',
    teamIds: ['team-1'],
    schedule: generateSchedule('user-1', ['office', 'office', 'home', 'office', 'home'])
  },
  {
    id: 'user-2',
    name: 'Bob Smith',
    email: 'bob@techsolutions.com',
    role: 'staff',
    organisationId: 'org-1',
    teamIds: ['team-1'],
    schedule: generateSchedule('user-2', ['office', 'home', 'office', 'home', 'office'])
  },
  {
    id: 'user-3',
    name: 'Charlie Brown',
    email: 'charlie@techsolutions.com',
    role: 'staff',
    organisationId: 'org-1',
    teamIds: ['team-1'],
    schedule: generateSchedule('user-3', ['home', 'office', 'office', 'office', 'home'])
  },
  {
    id: 'user-4',
    name: 'Diana Prince',
    email: 'diana@techsolutions.com',
    role: 'staff',
    organisationId: 'org-1',
    teamIds: ['team-1'],
    schedule: generateSchedule('user-4', ['office', 'office', 'office', 'home', 'home'])
  },
  {
    id: 'user-5',
    name: 'Ethan Hunt',
    email: 'ethan@techsolutions.com',
    role: 'staff',
    organisationId: 'org-1',
    teamIds: ['team-1', 'team-2'],
    schedule: generateSchedule('user-5', ['home', 'home', 'office', 'office', 'office'])
  },
  {
    id: 'user-6',
    name: 'Fiona Green',
    email: 'fiona@creativeagency.com',
    role: 'org_admin',
    organisationId: 'org-2',
    teamIds: ['team-3'],
    schedule: generateSchedule('user-6', ['office', 'home', 'office', 'home', 'office'])
  },
  {
    id: 'user-7',
    name: 'George Wilson',
    email: 'george@techsolutions.com',
    role: 'staff',
    organisationId: 'org-1',
    teamIds: ['team-2'],
    schedule: generateSchedule('user-7', ['office', 'office', 'home', 'home', 'office'])
  },
  {
    id: 'user-8',
    name: 'Hannah Lee',
    email: 'hannah@creativeagency.com',
    role: 'staff',
    organisationId: 'org-2',
    teamIds: ['team-3'],
    schedule: generateSchedule('user-8', ['home', 'office', 'office', 'home', 'office'])
  },
  {
    id: 'user-9',
    name: 'Ian Murphy',
    email: 'ian@creativeagency.com',
    role: 'staff',
    organisationId: 'org-2',
    teamIds: ['team-3'],
    schedule: generateSchedule('user-9', ['office', 'home', 'home', 'office', 'office'])
  }
];

// Mock current user - change this to test different roles
export const currentUser: User = users[0]; // Alice Johnson (org_admin)

// Helper functions
export function getUserById(id: string): User | undefined {
  return users.find(u => u.id === id);
}

export function getTeamById(id: string): Team | undefined {
  return teams.find(t => t.id === id);
}

export function getOrganisationById(id: string): Organisation | undefined {
  return organisations.find(o => o.id === id);
}

export function getUsersByTeam(teamId: string): User[] {
  const team = getTeamById(teamId);
  if (!team) return [];
  return users.filter(u => u.teamIds.includes(teamId));
}

export function getTeamsByOrganisation(orgId: string): Team[] {
  return teams.filter(t => t.organisationId === orgId);
}

export function getUsersByOrganisation(orgId: string): User[] {
  return users.filter(u => u.organisationId === orgId);
}

