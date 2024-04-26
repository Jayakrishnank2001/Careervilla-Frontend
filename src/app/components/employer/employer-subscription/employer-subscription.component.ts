import { Component, OnInit } from '@angular/core';
import { ISubscriptionRes } from 'src/app/models/subscriptionPlan';
import { SubscriptionPlanService } from 'src/app/services/subscription-plan.service';
import { MatDialog } from '@angular/material/dialog';
import { environments } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { JobService } from 'src/app/services/job.service';
import { IJobRes } from 'src/app/models/job';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-employer-subscription',
  templateUrl: './employer-subscription.component.html',
  styleUrls: ['./employer-subscription.component.css']
})
export class EmployerSubscriptionComponent implements OnInit {

  plans: ISubscriptionRes[] = []
  paymentHandler: any = null;
  success: boolean = false
  failure: boolean = false

  constructor(private subscriptionPlanService: SubscriptionPlanService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar,
    private jobService: JobService,
  private authService:AuthService) { }
  

  ngOnInit(): void {
    this.getPlans()
    this.invokeStripe()
  }

  getPlans(): void {
    this.subscriptionPlanService.getAllPlans('employer').subscribe({
      next: (res) => {
        if (res !== null) {
          this.plans = res
        }
      }
    })
  }

  makePayment(amount: number, duration: string | undefined, planId: string | undefined) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: environments.stripe_publishable_key,
      locale: 'auto',
      token: (stripeToken: any) => {
        console.log(stripeToken);
        paymentstripe(stripeToken);
      }
    });

    const paymentstripe = (stripeToken: any) => {
      const employerId = this.authService.extractUserIdFromToken('employerToken')
      if(employerId && duration && planId)
      this.subscriptionPlanService.makePayment(stripeToken,duration,employerId,planId).subscribe({
        next: (res) => {
          if (res.data == 'success') {
            this.success = true
            const data= localStorage.getItem('postJobDetails')
            if (data) {
              const storedData: IJobRes = JSON.parse(data);
              this.jobService.saveJob(storedData,employerId).subscribe({
                next: () => {
                  
                }
              })
            }
            
            void this.router.navigate(['/employer/post-job'])
            this.snackBar.open('Job Posted Successfully', 'Close', {
              duration: 5000,
              verticalPosition: 'top',
            })
          } else {
            this.failure=true
          }
        }
      })

    };

    paymentHandler.open({
      name: 'Careervilla Payment',
      description: 'Subscription Plan Payment',
      amount: amount * 100,
      image: "../../../../assets/images/app-logo.png",
      currency: 'USD',
      email: 'careervilla@help.com',
      shippingAddress: true,
      billingAddress: true,
      zipCode: true,
      panelLabel: 'Pay {{amount}}',
      allowRememberMe: true
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key:environments.stripe_publishable_key,
          locale: 'auto',
          token: function (stripeToken: any) {
          },
        });
      };

      window.document.body.appendChild(script);
    }
  }



}
