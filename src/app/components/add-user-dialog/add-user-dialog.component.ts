import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { UserManagementService } from '../../services';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit, OnDestroy {
  public userGroup: FormGroup;
  private numberRegex = /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/;
  private destroy$ = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number, name: string, netPoints: string, isEdit: boolean },
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddUserDialogComponent>,
    private userManagementService: UserManagementService
  ) { }

  ngOnInit(): void {
    this.userGroup = this.fb.group({
      name: ['', Validators.required],
      netPoints: [
        null,
        [
          Validators.required,
          Validators.pattern(this.numberRegex)
        ]
      ]
    })

    if (this.data.isEdit) {
      this.userManagementService.UsersData$.pipe(
        takeUntil(this.destroy$),
        tap(usersData => {
          const { name, netPoints } = usersData.find(data => data.id === this.data.id)
          this.userGroup.patchValue({ name, netPoints });
        })
      ).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public updateUser(): void {
    if (this.data.isEdit) {
      this.userManagementService.modifyUser(this.data.id, this.userGroup.value.name, this.userGroup.value.netPoints);
    } else {
      this.userManagementService.addUser(this.userGroup.value);
    }
    this.close();
  }

  public close(): void {
    this.dialogRef.close();
  }

}

