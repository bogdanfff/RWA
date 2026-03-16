import { Team } from "../../teams/models/teams.model";


export interface Line {
  id: number;
  lineName: string;
  description?: string;           // Optional since nullable
  assignedShift?: number | null;  // Optional since nullable
  assignedShiftDate?: Date | null; // Optional since nullable
  assignedTarget?: number | null;  // Optional since nullable
  assignedByUser?: string | null;  // Optional since nullable
  assignedEmployeesNo?: number | null; // Optional since nullable
  assignedTeam?: string | null;      // Optional since nullable
  segmentName: string;
  updateDate: Date;
  team?: Team | null;               // Optional since nullable
}

export const columnsLines: { key: keyof Line; label: string ;formatter?: (value: any) => string; }[] = [
  { key: 'lineName', label: 'Line Name' },
  { key: 'description', label: 'Description' },
  { key: 'assignedShift', label: 'Assigned Shift' },
  { key: 'assignedShiftDate', label: 'Shift Date', formatter: (value: string) =>new Date(value).toLocaleDateString('sr-RS') },
  { key: 'assignedTarget', label: 'Assigned Target' },
  { key: 'assignedByUser', label: 'Assigned By' },
  { key: 'assignedEmployeesNo', label: 'Employees No' },
  { key: 'assignedTeam', label: 'Assigned Team' },
  { key: 'segmentName', label: 'Segment Name' },
] as const;
export const displayedColumnsLines = [...columnsLines.map(c => c.key), 'button'];
