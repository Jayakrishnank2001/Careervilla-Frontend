import { Component, OnInit } from '@angular/core';
import { ISubscriptionRes } from 'src/app/models/subscriptionPlan';
import { MatDialog } from '@angular/material/dialog';
import { AdminPlansDialogComponent } from '../admin-plans-dialog/admin-plans-dialog.component';
import Swal from 'sweetalert2';
import { IRes } from 'src/app/models/common';
import { SubscriptionPlanService } from 'src/app/services/subscription-plan.service';

@Component({
  selector: 'app-admin-subscription',
  templateUrl: './admin-subscription.component.html',
  styleUrls: ['./admin-subscription.component.css']
})
export class AdminSubscriptionComponent implements OnInit {
  plans: ISubscriptionRes[] = []

  constructor(private readonly subscriptionPlanService: SubscriptionPlanService,
    private dialog: MatDialog) { }

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
            const planIndex = this.plans.findIndex(plan => plan._id === planId)
            if (planIndex !== -1) {
              this.plans = [
                ...this.plans.slice(0, planIndex),
                ...this.plans.slice(planIndex + 1)
              ]
            }
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
                void Swal.fire({
                  title: 'New Plan created Successfully',
                  icon: 'success',
                  timer: 3000,
                  showConfirmButton: false
                })
              } else {
                void Swal.fire({
                  title: 'Plan Already Exists',
                  icon: 'warning',
                  timer: 3000,
                  showConfirmButton: false
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
                void Swal.fire({
                  title: 'Plan Updated Successfully',
                  icon: 'success',
                  timer: 3000,
                  showConfirmButton: false
                })
              }
            }
          })
        }
      }
    })
  }

}
