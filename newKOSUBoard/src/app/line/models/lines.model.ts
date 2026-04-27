import { Team } from "../../teams/models/teams.model";


export interface Line {
  id: number;
  lineName: string;
  description?: string;
  assignedShift?: number | null;
  assignedShiftDate?: Date | null;
  assignedTarget?: number | null;
  assignedByUser?: string | null;
  assignedEmployeesNo?: number | null;
  assignedTeam?: string | null;
  assignedTeamId?: number | null;
  segmentName: string;
  segmentNameId:number;
  updateDate: Date;
}

export const columnsLines: { key: keyof Line; label: string ;formatter?: (value: any) => string; }[] = [
  { key: 'lineName', label: 'Line Name' },
  { key: 'segmentName', label: 'Segment Name' },
  { key: 'description', label: 'Description' },
  { key: 'assignedShift', label: 'Assigned Shift' },
  { key: 'assignedShiftDate', label: 'Shift Date', formatter: (value: string) => value ? new Date(value).toLocaleDateString('sr-RS'):'' },
  { key: 'assignedTarget', label: 'Assigned Target' },
  { key: 'assignedByUser', label: 'Assigned By' },
  { key: 'assignedEmployeesNo', label: 'Employees No' },
  { key: 'assignedTeam', label: 'Assigned Team' },
] as const;
export const displayedColumnsLines = [...columnsLines.map(c => c.key), 'button'];
