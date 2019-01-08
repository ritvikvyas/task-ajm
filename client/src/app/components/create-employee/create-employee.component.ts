import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatBottomSheetRef, MatDialog, MatDialogRef } from '@angular/material';
import { map } from 'rxjs/operators';

import { Employee } from 'src/app/models/employee';
import { BonusPlan } from 'src/app/models/bonus_plan';
import { ApiService } from 'src/app/services/api.service';
import { Result } from 'src/app/interfaces/result';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<CreateEmployeeComponent>,
    private api: ApiService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef) {}

  isLoadingResults = true;
  employee: Employee = new Employee();
  plans: BonusPlan[];

  ngOnInit() {
    this.api.get('/bonusplan')
    .pipe(map(res => res.json()))
    .subscribe((response: Result) => {
        const data = response.data;
        this.plans = data.result;
        this.isLoadingResults = false;
      },
      error => console.log(error)
    );
  }

  submit(event: MouseEvent): void {
    this.isLoadingResults = true;
    this.api.post('/employee', this.employee)
    .pipe(map(res => res.json()))
    .subscribe((response: Result) => {
        this.bottomSheetRef.dismiss();
        event.preventDefault();
      },
      error => console.log(error)
    );
  }

  openBonusPlanDialog(): void {
    const dialogRef = this.dialog.open(CreateBonusPlanComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.plans.push(result);
        this.employee.bonusPlan = result;
        this.cdRef.detectChanges();
      }
    });
  }

}

@Component({
  selector: 'app-create-bonus-plan',
  styleUrls: ['./create-employee.component.css'],
  template: `
  <div class="loading"
      *ngIf="isLoadingResults">
  <mat-spinner *ngIf="isLoadingResults"></mat-spinner>
  </div>
  <form #bonusPlanForm="ngForm" (ngSubmit)="submit()">
    <mat-grid-list cols="2" rowHeight="2:1">
        <mat-grid-tile>
            <mat-form-field appearance="outline">
              <mat-label>Name</mat-label>
              <input matInput [(ngModel)]="plan.name"
                type="text" name="name" required>
            </mat-form-field>
        </mat-grid-tile>
        <mat-grid-tile>
            <mat-form-field appearance="outline">
              <mat-label>Value</mat-label>
              <input matInput [(ngModel)]="plan.value"
              type="number" min="0" name="value" required>
            </mat-form-field>
        </mat-grid-tile>
    </mat-grid-list>
  <button mat-raised-button color="primary" class="add-button"
  type="submit" [disabled]="!bonusPlanForm.form.valid">Add</button>
  </form>
  `,
})
export class CreateBonusPlanComponent {

  constructor(private dialogRef: MatDialogRef<CreateBonusPlanComponent>,
    private api: ApiService) {}

  isLoadingResults = false;
  plan: BonusPlan = new BonusPlan();

  submit(): void {
    this.isLoadingResults = true;
    this.api.post('/bonusplan', this.plan)
    .pipe(map(res => res.json()))
    .subscribe((response: Result) => {
        this.dialogRef.close(response.data.result);
      },
      error => console.log(error)
    );
  }

}
