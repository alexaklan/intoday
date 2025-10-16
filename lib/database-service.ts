import { supabase } from './supabase';
// Remove unused import

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'staff' | 'org_admin' | 'app_admin';
  organisationId: string;
  teamIds: string[];
}

export interface Team {
  id: string;
  name: string;
  organisationId: string;
  memberCount: number;
}

export interface Organisation {
  id: string;
  name: string;
  subdomain: string;
  status: 'active' | 'inactive' | 'suspended';
  plan: 'free' | 'pro' | 'enterprise';
  adminIds: string[];
}

export interface DaySchedule {
  date: Date;
  location: 'office' | 'home';
}

// Fetch all users in an organisation
export async function getUsersByOrganisation(organisationId: string): Promise<User[]> {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select(`
        id,
        name,
        email,
        role,
        organisation_id,
        user_teams (
          team_id
        )
      `)
      .eq('organisation_id', organisationId);

    if (error) {
      console.error('Error fetching users:', error);
      return [];
    }

    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      organisationId: user.organisation_id,
      teamIds: user.user_teams?.map((ut: { team_id: string }) => ut.team_id) || [],
    }));
  } catch (error) {
    console.error('Error in getUsersByOrganisation:', error);
    return [];
  }
}

// Fetch all teams in an organisation
export async function getTeamsByOrganisation(organisationId: string): Promise<Team[]> {
  try {
    const { data: teams, error } = await supabase
      .from('teams')
      .select(`
        id,
        name,
        organisation_id,
        user_teams (
          user_id
        )
      `)
      .eq('organisation_id', organisationId);

    if (error) {
      console.error('Error fetching teams:', error);
      return [];
    }

    return teams.map(team => ({
      id: team.id,
      name: team.name,
      organisationId: team.organisation_id,
      memberCount: team.user_teams?.length || 0,
    }));
  } catch (error) {
    console.error('Error in getTeamsByOrganisation:', error);
    return [];
  }
}

// Fetch all organisations
export async function getAllOrganisations(): Promise<Organisation[]> {
  try {
    const { data: organisations, error } = await supabase
      .from('organisations')
      .select(`
        id,
        name,
        subdomain,
        status,
        plan,
        users (
          id,
          role
        )
      `);

    if (error) {
      console.error('Error fetching organisations:', error);
      return [];
    }

    return organisations.map(org => ({
      id: org.id,
      name: org.name,
      subdomain: org.subdomain,
      status: org.status,
      plan: org.plan,
      adminIds: org.users?.filter((user: { role: string }) => user.role === 'org_admin').map((user: { id: string }) => user.id) || [],
    }));
  } catch (error) {
    console.error('Error in getAllOrganisations:', error);
    return [];
  }
}

// Fetch user schedules for a specific week
export async function getUserSchedulesForWeek(userId: string, weekStart: Date): Promise<DaySchedule[]> {
  try {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const { data: schedules, error } = await supabase
      .from('schedules')
      .select('date, location')
      .eq('user_id', userId)
      .gte('date', weekStart.toISOString().split('T')[0])
      .lte('date', weekEnd.toISOString().split('T')[0]);

    if (error) {
      console.error('Error fetching schedules:', error);
      return [];
    }

    return schedules.map(schedule => ({
      date: new Date(schedule.date),
      location: schedule.location,
    }));
  } catch (error) {
    console.error('Error in getUserSchedulesForWeek:', error);
    return [];
  }
}

// Update user schedule for a specific date
export async function updateUserSchedule(userId: string, date: Date, location: 'office' | 'home'): Promise<boolean> {
  try {
    const dateString = date.toISOString().split('T')[0];

    const { error } = await supabase
      .from('schedules')
      .upsert({
        user_id: userId,
        date: dateString,
        location: location,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Error updating schedule:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in updateUserSchedule:', error);
    return false;
  }
}

// Create a new team
export async function createTeam(name: string, organisationId: string, userIds: string[]): Promise<string | null> {
  try {
    // Create the team
    const { data: team, error: teamError } = await supabase
      .from('teams')
      .insert({
        name,
        organisation_id: organisationId,
      })
      .select('id')
      .single();

    if (teamError || !team) {
      console.error('Error creating team:', teamError);
      return null;
    }

    // Add users to the team
    if (userIds.length > 0) {
      const userTeamInserts = userIds.map(userId => ({
        user_id: userId,
        team_id: team.id,
      }));

      const { error: userTeamError } = await supabase
        .from('user_teams')
        .insert(userTeamInserts);

      if (userTeamError) {
        console.error('Error adding users to team:', userTeamError);
        // Team was created but users weren't added - still return success
      }
    }

    return team.id;
  } catch (error) {
    console.error('Error in createTeam:', error);
    return null;
  }
}

// Create a new user
export async function createUser(
  name: string,
  email: string,
  role: 'staff' | 'org_admin' | 'app_admin',
  organisationId: string,
  teamIds: string[]
): Promise<string | null> {
  try {
    // Create the user
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert({
        name,
        email,
        password_hash: '$2a$10$dummy.hash.for.new.users', // Default password hash
        role,
        organisation_id: organisationId,
      })
      .select('id')
      .single();

    if (userError || !user) {
      console.error('Error creating user:', userError);
      return null;
    }

    // Add user to teams
    if (teamIds.length > 0) {
      const userTeamInserts = teamIds.map(teamId => ({
        user_id: user.id,
        team_id: teamId,
      }));

      const { error: userTeamError } = await supabase
        .from('user_teams')
        .insert(userTeamInserts);

      if (userTeamError) {
        console.error('Error adding user to teams:', userTeamError);
        // User was created but teams weren't added - still return success
      }
    }

    return user.id;
  } catch (error) {
    console.error('Error in createUser:', error);
    return null;
  }
}
