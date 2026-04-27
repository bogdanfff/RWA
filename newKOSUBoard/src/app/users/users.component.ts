import { Component, inject, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Store } from "@ngrx/store";
import { Subject, Observable, takeUntil } from "rxjs";
import { TableAction, TableAddButton } from "../shared/ui/table/models/table.model";
import { columnsUsers, displayedColumnsUsers, User } from "./models/users.model";
import { AsyncPipe } from "@angular/common";
import { TableComponent } from "../shared/ui/table/table.component";
import * as UsersSelectors from '../store/users/users.selector';
import { MatDialog } from "@angular/material/dialog";
import { AddDialogComponent } from "../add-dialog/ui/add-dialog.component";
import { createTableActions, createAddButton } from "../shared/functions/tableActions";
import { UsersActions } from "../store/users/users.actions";
import { DialogService } from "../add-dialog/data/dialog.service";
import { TableFilterComponent } from "../shared/ui/table/filters/text.filter";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AsyncPipe, TableComponent,TableFilterComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  columns = columnsUsers
  displayedColumns = displayedColumnsUsers
  actions = createTableActions<User>(
    (user) => this.addOrEditUser(user),
    (user) => this.deleteUser(user.id)
  );

  addButton = createAddButton('New user', () => this.addOrEditUser());

  readonly dialog = inject(MatDialog);
  readonly store = inject(Store)
  private readonly addEditDialog = inject(DialogService)

  private destroy$ = new Subject<void>();
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  constructor() {
    this.users$ = this.store.select(UsersSelectors.selectAllUsers);
    this.loading$ = this.store.select(UsersSelectors.selectUsersLoading);
    this.error$ = this.store.select(UsersSelectors.selectUsersError);

    this.users$.pipe(takeUntil(this.destroy$))
  }

  ngOnInit(): void {
    // Load all users on init
    this.store.dispatch(UsersActions.load());
  }

  addOrEditUser(user?: User) {
    this.addEditDialog.open<User>('user', user, UsersActions);
  }

  updateUser(user: User) {
    this.store.dispatch(UsersActions.update({ item: user }));
  }

  deleteUser(id: number) {
    this.store.dispatch(UsersActions.delete({ id }));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}