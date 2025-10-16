export type WorkLocation = 'office' | 'home';

export interface DaySchedule {
  date: string; // YYYY-MM-DD format
  location: WorkLocation;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'staff' | 'org_admin' | 'app_admin';
  organisationId: string;
  teamIds: string[];
  schedule: DaySchedule[];
}

export interface Team {
  id: string;
  name: string;
  organisationId: string;
  memberIds: string[];
}

export interface Organisation {
  id: string;
  name: string;
  adminIds: string[];
}

export interface WeekView {
  startDate: Date;
  endDate: Date;
  days: Date[];
}

