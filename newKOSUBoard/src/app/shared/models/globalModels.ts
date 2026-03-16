export type allEntities = 'user' | 'line' | 'team' | 'segment'
export interface DialogData<T> {
  entity: allEntities;
  edit: boolean;
  value: T | null;
}