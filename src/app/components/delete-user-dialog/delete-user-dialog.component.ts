import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserManagementService } from '../../services';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    private userManagementService: UserManagementService
  ) { }

  ngOnInit(): void {
  }

  public close(): void {
    this.dialogRef.close();
  }

  public deleteUser(): void {
    this.userManagementService.deleteUser(this.data.id)
    this.close();
  }

}
