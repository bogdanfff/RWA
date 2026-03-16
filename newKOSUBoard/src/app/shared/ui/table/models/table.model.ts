export interface TableAction<T> {
  icon: string;
  tooltip: string;
  color?: string;
  warn?:boolean;
  action: (row: T) => void;
}
export interface TableAddButton {
  label: string;
  action: () => void;
}