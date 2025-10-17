import { supabase, supabaseAdmin } from './supabase';
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
    console.log('Fetching organisations from database...');
    
    const { data: organisations, error } = await supabase
      .from('organisations')
      .select('*');

    console.log('Organisations query result:', { organisations, error });

    if (error) {
      console.error('Error fetching organisations:', error);
      return [];
    }

    if (!organisations || organisations.length === 0) {
      console.log('No organisations found in database');
      return [];
    }

    // Get admin users for each organisation
    const orgsWithAdmins = await Promise.all(
      organisations.map(async (org) => {
        const { data: users } = await supabase
          .from('users')
          .select('id, role')
          .eq('organisation_id', org.id)
          .eq('role', 'org_admin');

        return {
          id: org.id,
          name: org.name,
          subdomain: org.subdomain,
          status: org.status,
          plan: org.plan,
          adminIds: users?.map(user => user.id) || [],
        };
      })
    );

    console.log('Organisations with admins:', orgsWithAdmins);
    return orgsWithAdmins;
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

    const { data: schedules, error } = await supabaseAdmin
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
    console.log('updateUserSchedule called with:', { userId, dateString, location });

    // Use the exact same approach that works in our test
    const { data, error } = await supabaseAdmin
      .from('schedules')
      .update({ 
        location: location,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .eq('date', dateString)
      .select();

    console.log('Supabase update result:', { data, error });

    if (error) {
      console.error('Supabase error updating schedule:', error);
      return false;
    }

    if (!data || data.length === 0) {
      console.error('No record found to update');
      return false;
    }

    console.log('Schedule updated successfully:', data);
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
    const { data: team, error: teamError } = await supabaseAdmin
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

      const { error: userTeamError } = await supabaseAdmin
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
    const { data: user, error: userError } = await supabaseAdmin
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

      const { error: userTeamError } = await supabaseAdmin
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
