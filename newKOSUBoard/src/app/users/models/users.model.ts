import { Team } from "../../teams/models/teams.model";
export const allRoles = [
  { id: 1, val: 'Administrator' },
  { id: 2, val: 'SuperHead' },
  { id: 3, val: 'HeadOfPlant' },
  { id: 4, val: 'HeadOfProduction' },
  { id: 5, val: 'Member' },
  { id: 6, val: 'TeamLeader' },
  { id: 7, val: 'SegmentLeader' }
]; export interface User {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  password?: string | null;  // Optional since nullable
  email: string;
  phoneNumber: string;
  roleId?: number | null;    // Optional since nullable
  roleName: string;
  active: boolean;
  createDate: Date;
  refreshToken?: string | null;  // Optional since nullable
  teamName?: Team ;            // Optional since nullable
  teamId:number;
}
export const columnsUsers: { key: keyof User; label: string; formatter?: (value: any) => string; }[] = [
  { key: 'userName', label: 'Username' },
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'email', label: 'Email' },
  { key: 'phoneNumber', label: 'Phone Number' },
  { key: 'roleName', label: 'Role' },
  { key: 'active', label: 'Active' },
  { key: 'createDate', label: 'Created At', formatter: (value: string) => new Date(value).toLocaleDateString('sr-RS') },
  { key: 'teamName', label: 'Team' }
] as const;
export const displayedColumnsUsers = [...columnsUsers.map(c => c.key), 'button'];
