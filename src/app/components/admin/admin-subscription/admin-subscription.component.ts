import { Component, OnInit } from '@angular/core';
import { ISubscriptionRes } from 'src/app/models/subscriptionPlan';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-subscription',
  templateUrl: './admin-subscription.component.html',
  styleUrls: ['./admin-subscription.component.css']
})
export class AdminSubscriptionComponent implements OnInit{
  plans: ISubscriptionRes[] = []
  
  constructor(private readonly adminService: AdminService) { }
  
  ngOnInit(): void {
    this.getPlans()
  }

  getPlans(): void{
    this.adminService.getAllPlans().subscribe({
      next: (res) => {
        if (res !== null) {
          this.plans=res
        }
      }
    })
  }

  onDeletePlan(planId:string): void{
    void Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this plan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText:'No, Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        this.adminService.deletePlan(planId).subscribe({
          next: (res) => {
            const planIndex = this.plans.findIndex(plan => plan._id === planId)
            if (planIndex !== -1) {
              this.plans = [
                ...this.plans.slice(0, planIndex),
                ...this.plans.slice(planIndex+1)
              ]
            }
          }
        })
      }
    })
  }

  onCreateNewPlan():void {
    
  }

  onEditPlan(planId:string):void {
    
  }

}
