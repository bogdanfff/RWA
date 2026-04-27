import { Line } from "../entities/line.entity";

export class LineResponseDto {
  id: number;
  lineName: string;
  description: string | null;
  assignedShift: number | null;
  assignedShiftDate: Date | null;
  assignedTarget: number | null;
  assignedByUser: string | null;
  assignedEmployeesNo: number | null;
  assignedTeam: string | undefined;
  assignedTeamId:number | undefined;

  segmentName: string;
  segmentNameId:number;
}

export function mapLineToDto(line: Line): LineResponseDto {
  return {
    id: line.id,
    lineName: line.lineName,
    description: line.description,
    assignedShift: line.assignedShift,
    assignedShiftDate: line.assignedShiftDate,
    assignedTarget: line.assignedTarget,
    assignedByUser: line.assignedByUser,
    assignedEmployeesNo: line.assignedEmployeesNo,
    assignedTeam: line.assignedTeam?.teamName,
    assignedTeamId:line.assignedTeam?.id,
    segmentName: line.segmentName.segmentName,
    segmentNameId:line.segmentName.id
  };
}
