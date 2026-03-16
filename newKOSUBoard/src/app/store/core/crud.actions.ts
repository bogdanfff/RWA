export function createCrudActions<T>(feature: string): CrudActions<T> {
  return {
    load: createAction(`[${feature}] Load`),
    loadSuccess: createAction(`[${feature}] Load Success`, props<{ items: T[] }>()),
    loadFailure: createAction(`[${feature}] Load Failure`, props<{ error: string }>()),

    add: createAction(`[${feature}] Add`, props<{ item: T }>()),
    addSuccess: createAction(`[${feature}] Add Success`, props<{ item: T }>()),
    addFailure: createAction(`[${feature}] Add Failure`, props<{ error: string }>()),

    update: createAction(`[${feature}] Update`, props<{ item: T }>()),
    updateSuccess: createAction(`[${feature}] Update Success`, props<{ item: T }>()),
    updateFailure: createAction(`[${feature}] Update Failure`, props<{ error: string }>()),

    delete: createAction(`[${feature}] Delete`, props<{ id: number }>()),
    deleteSuccess: createAction(`[${feature}] Delete Success`, props<{ id: number }>()),
    deleteFailure: createAction(`[${feature}] Delete Failure`, props<{ error: string }>())
  };
}
import { ActionCreator, createAction, props } from '@ngrx/store';

export interface CrudActions<T> {
  load: ActionCreator<string, () => { type: string }>;
  loadSuccess: ActionCreator<string, (props: { items: T[] }) => { items: T[]; type: string }>;
  loadFailure: ActionCreator<string, (props: { error: string }) => { error: string; type: string }>;

  add: ActionCreator<string, (props: { item: T }) => { item: T; type: string }>;
  addSuccess: ActionCreator<string, (props: { item: T }) => { item: T; type: string }>;
  addFailure: ActionCreator<string, (props: { error: string }) => { error: string; type: string }>;

  update: ActionCreator<string, (props: { item: T }) => { item: T; type: string }>;
  updateSuccess: ActionCreator<string, (props: { item: T }) => { item: T; type: string }>;
  updateFailure: ActionCreator<string, (props: { error: string }) => { error: string; type: string }>;

  delete: ActionCreator<string, (props: { id: number }) => { id: number; type: string }>;
  deleteSuccess: ActionCreator<string, (props: { id: number }) => { id: number; type: string }>;
  deleteFailure: ActionCreator<string, (props: { error: string }) => { error: string; type: string }>;
}