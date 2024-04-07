import { Component, OnInit } from '@angular/core';
import { ISubscriptionRes } from 'src/app/models/subscriptionPlan';
import { MatDialog } from '@angular/material/dialog';
import { AdminPlansDialogComponent } from '../admin-plans-dialog/admin-plans-dialog.component';
import Swal from 'sweetalert2';
import { IRes } from 'src/app/models/common';
import { SubscriptionPlanService } from 'src/app/services/subscription-plan.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-subscription',
  templateUrl: './admin-subscription.component.html',
  styleUrls: ['./admin-subscription.component.css']
})
export class AdminSubscriptionComponent implements OnInit {
  plans: ISubscriptionRes[] = []

  constructor(private readonly subscriptionPlanService: SubscriptionPlanService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getPlans()
  }

  getPlans(): void {
    this.subscriptionPlanService.getAllPlans('admin').subscribe({
      next: (res) => {
        if (res !== null) {
          this.plans = res
        }
      }
    })
  }

  onDeletePlan(planId: string): void {
    void Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this plan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'No, Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        this.subscriptionPlanService.deletePlan(planId).subscribe({
          next: () => {
            this.ngOnInit()
            this.snackBar.open('Plan deleted successfully', 'Close', {
              duration: 5000,
              verticalPosition:'top'
            })
          }
        })
      }
    })
  }

  onCreateNewPlan(): void {
    this.openDialog(false)
  }

  onEditPlan(planId: string): void {
    this.openDialog(true, planId)
  }

  openDialog(editMode: boolean, planId?: string): void {
    const dialogRef = this.dialog.open(AdminPlansDialogComponent, {
      data: { editMode, planId, plans: this.plans }
    })
    dialogRef.afterClosed().subscribe((result: ISubscriptionRes) => {
      if (result) {
        if (!editMode) {
          this.subscriptionPlanService.createPlan(result).subscribe({
            next: (res: IRes) => {
              this.getPlans()
              if (res.data.message == 'Plan created successfully') {
                this.snackBar.open('New plan created', 'Close', {
                  duration: 5000,
                  verticalPosition:'top'
                })
              } else {
                this.snackBar.open('Plan already exists', 'Close', {
                  duration: 5000,
                  verticalPosition:'top'
                })
              }
            }
          })
        } else if (planId !== undefined) {
          console.log(result)
          this.subscriptionPlanService.editPlan(planId, result).subscribe({
            next: (res: IRes) => {
              this.getPlans()
              if (res.data.message == 'Plan updated successfully') {
                this.snackBar.open('Plan updated successfully', 'Close', {
                  duration: 5000,
                  verticalPosition:'top'
                })
              }
            }
          })
        }
      }
    })
  }

}
