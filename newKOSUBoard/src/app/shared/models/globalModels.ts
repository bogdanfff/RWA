export type allEntities = 'user' | 'line' | 'team' | 'segment' | 'assign' | 'hourly'
export interface DialogData<T> {
  entity: allEntities;
  edit: boolean;
  value: T | null;
  dialogAdditional?: { [key: string]: any };
}