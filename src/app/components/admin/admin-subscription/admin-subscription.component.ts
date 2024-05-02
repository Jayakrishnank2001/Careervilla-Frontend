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
  currPage = 1
  itemsPerPage = 5
  searchQuery: string = ''
  plansCount = 0

  constructor(private readonly _subscriptionPlanService: SubscriptionPlanService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getPlans()
  }

  getPlans(): void {
    this._subscriptionPlanService.getAllPlans('admin', this.currPage, this.itemsPerPage, this.searchQuery).subscribe({
      next: (res) => {
        if (res.data !== null) {
          this.plans = res.data?.plans
          this.plansCount = res.data.plansCount
        }
      }
    })
  }

  onSearchPlan(searchQuery: string): void {
    this.searchQuery = searchQuery
    this.getPlans()
  }

  onPageChange(page: number): void {
    this.currPage = page
    this.getPlans()
  }

  onItemsPerPageChange(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage
    this.currPage = 1
    this.getPlans()
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
        this._subscriptionPlanService.deletePlan(planId).subscribe({
          next: () => {
            this.ngOnInit()
            this._snackBar.open('Plan deleted successfully', 'Close', {
              duration: 5000,
              verticalPosition: 'top'
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
    const dialogRef = this._dialog.open(AdminPlansDialogComponent, {
      data: { editMode, planId, plans: this.plans }
    })
    dialogRef.afterClosed().subscribe((result: ISubscriptionRes) => {
      if (result) {
        if (!editMode) {
          this._subscriptionPlanService.createPlan(result).subscribe({
            next: (res: IRes) => {
              this.getPlans()
              if (res.data.message == 'Plan created successfully') {
                this._snackBar.open('New plan created', 'Close', {
                  duration: 5000,
                  verticalPosition: 'top'
                })
              } else {
                this._snackBar.open('Plan already exists', 'Close', {
                  duration: 5000,
                  verticalPosition: 'top'
                })
              }
            }
          })
        } else if (planId !== undefined) {
          this._subscriptionPlanService.editPlan(planId, result).subscribe({
            next: (res: IRes) => {
              this.getPlans()
              if (res.data.message == 'Plan updated successfully') {
                this._snackBar.open('Plan updated successfully', 'Close', {
                  duration: 5000,
                  verticalPosition: 'top'
                })
              }
            }
          })
        }
      }
    })
  }



  

}
