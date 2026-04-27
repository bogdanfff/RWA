import { Validators } from "@angular/forms";
import { Observable } from "rxjs";

type FieldType = 'text' | 'email' | 'password' | 'number' | 'checkbox' | 'select' | 'date';
type optionType = { id: number, val: string,disabled?:boolean }
export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  validators?: any[];
  options?: { label: string; value: any }[]; // optional static options
  selectValue?: 'id' | 'val',
  // fetchOptions?: () => Observable<{ label: string; value: any }[]>; // for async dropdown
  dropDown?: Observable<optionType[]>
  errorText?: string
}
export function getShiftsByGroup(group: number = 1, usedShifts: number[] = []) {
  const baseHour = 6;
  const start = (group - 1) * 8;

  return Array.from({ length: 8 }, (_, i) => {
    const id = start + i + 1;
    const from = baseHour + start + i;
    const to = from + 1;

    return {
      id,
      from,
      val: `${formatHour(from)}-${formatHour(to)}h`,
      disabled: usedShifts.includes(id)
    };
  });
}
function formatHour(hour: number): string {
  const h = hour % 24; // da ne ode preko 24h
  return `${h.toString().padStart(2, '0')}`;
}

interface FormSchema {
  [entity: string]: FormField[];
}

