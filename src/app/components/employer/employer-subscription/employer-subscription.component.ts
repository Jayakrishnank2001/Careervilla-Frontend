import { Component, OnInit } from '@angular/core';
import { ISubscriptionRes } from 'src/app/models/subscriptionPlan';
import { SubscriptionPlanService } from 'src/app/services/subscription-plan.service';

@Component({
  selector: 'app-employer-subscription',
  templateUrl: './employer-subscription.component.html',
  styleUrls: ['./employer-subscription.component.css']
})
export class EmployerSubscriptionComponent implements OnInit{

  plans:ISubscriptionRes[]=[]

  constructor(private subscriptionPlanService:SubscriptionPlanService) { }
  
  ngOnInit(): void {
    this.getPlans()
  }

  getPlans(): void {
    this.subscriptionPlanService.getAllPlans('employer').subscribe({
      next: (res) => {
        if (res !== null) {
          this.plans = res
          console.log(this.plans)
        }
      }
    })
  }

  

}
