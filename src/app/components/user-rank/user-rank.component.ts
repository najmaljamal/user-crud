import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { UserManagementService } from '../../services';


@Component({
  selector: 'app-user-rank',
  templateUrl: './user-rank.component.html',
  styleUrls: ['./user-rank.component.scss']
})
export class UserRankComponent {
  displayedColumns: string[] = ['userrank', 'username', 'usernetPoints', 'useractions'];
  dataSource$ = this.userManagementService.UsersData$;

  constructor(
    public dialog: MatDialog,
    private userManagementService: UserManagementService
  ) { }

  public addUser(): void {
    this.dialog.open(AddUserDialogComponent, { data: { isEdit: false }})
  }

  public editUser(id: number): void {
    this.dialog.open(AddUserDialogComponent, { data: { id, isEdit: true }})

  }

  public deleteUser(id: number): void {
    this.dialog.open(DeleteUserDialogComponent, { data: { id }})
  }

}
