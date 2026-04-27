export interface Hourly {
  id: number;
  // lineName: string;
  shiftPatternId: number;
  teamName: string;
  teamId: number;
  insertedBy: string;
  plannedEmployeesNo: number;
  employeesNo: number;
  workingMinutes: number;
  productName: string;
  producedProductNo: number;
  plannedProductNo: number;
  efficiencyE1: number;
  absentism: number;
  comment: string;
  clockingWorkingHour: string;
  // insertedDate:string
}
export const shiftPatternHours: Record<number, string> = Object.fromEntries(
  Array.from({ length: 24 }, (_, i) => {
    const start = (6 + i) % 24;
    const end = (start + 1) % 24;
    const format = (h: number) => h.toString().padStart(2, '0') + ':00';
    return [i + 1, `${format(start)} - ${format(end)}`];
  })
);
export const columnsHourlies: { key: keyof Hourly; label: string; formatter?: (value: any) => string }[] = [
  // { key: 'lineName', label: 'Line Name' },
  { key: 'teamName', label: 'Team Name' },
  { key: 'shiftPatternId', label: 'Clocking Hour',formatter: (value: number) => shiftPatternHours[value] ?? 'Unknown'  },
  { key: 'plannedEmployeesNo', label: 'Planned Employees' },
  { key: 'employeesNo', label: 'Employees No' },
  { key: 'plannedProductNo', label: 'Planned Product No' },
  { key: 'producedProductNo', label: 'Produced Product No' },
  { key: 'workingMinutes', label: 'Working Minutes' },
  { key: 'productName', label: 'Product Name' },
  { key: 'efficiencyE1', label: 'Efficiency' ,formatter: (value: number) => value + '%'  },
  { key: 'absentism', label: 'Absentism' ,formatter: (value: number) => value + '%'  },
  { key: 'insertedBy', label: 'Inserted By' },
  { key: 'comment', label: 'Comment' },
];

export const displayedColumnsHourlies = [...columnsHourlies.map(c => c.key), 'button'];