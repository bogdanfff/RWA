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
  segmentName: string;
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
    segmentName: line.segmentName.segmentName,
  };
}
