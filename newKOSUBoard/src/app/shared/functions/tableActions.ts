// table-utils.ts
import { TableAction,TableAddButton } from "../ui/table/models/table.model";

export function createTableActions<T>(
  editFn: (item: T) => void,
  deleteFn: (item: T) => void
): TableAction<T>[] {
  return [
    {
      icon: 'edit',
      tooltip: 'Edit',
      action: editFn
    },
    {
      icon: 'delete',
      tooltip: 'Delete',
      warn: true,
      action: deleteFn
    }
  ];
}

export function createAddButton<T>(label: string, addFn: (item?:T) => void): TableAddButton {
  return { label, action: addFn };
}