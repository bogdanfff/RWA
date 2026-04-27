import { Hourly } from "../entities/hourly.entity";

export class HourlyResponseDto {
  id: number;
  teamName: string;
  shiftPatternId: number;
  // teamName: string;
  insertedBy: string;
  plannedEmployeesNo: number;
  employeesNo: number;
  workingMinutes: number;
  productName: string;
  producedProductNo: number;
  plannedProductNo: number;
  efficiencyE1: number;
  absentism: number;
  comment: string | null;
}

export function mapHourlyToDto(hourly: Hourly): HourlyResponseDto {
  return {
    id: hourly.id,
    teamName: hourly.team.teamName,
    shiftPatternId: hourly.shiftPatternId,
    // teamName: hourly.teamName,
    insertedBy: hourly.insertedBy,
    plannedEmployeesNo: hourly.plannedEmployeesNo,
    employeesNo: hourly.employeesNo,
    workingMinutes: hourly.workingMinutes,
    productName: hourly.productName,
    producedProductNo: hourly.producedProductNo,
    plannedProductNo: hourly.plannedProductNo,
    efficiencyE1: hourly.efficiencyE1,
    absentism: hourly.absentism,
    comment: hourly.comment ?? null,
  };
}