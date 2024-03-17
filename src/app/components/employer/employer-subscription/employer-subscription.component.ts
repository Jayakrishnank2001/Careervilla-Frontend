import { Component, OnInit } from '@angular/core';
import { ISubscriptionRes } from 'src/app/models/subscriptionPlan';
import { SubscriptionPlanService } from 'src/app/services/subscription-plan.service';
import { MatDialog } from '@angular/material/dialog';
import { environments } from 'src/environments/environment';

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
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPlans()
    this.invokeStripe()
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

  makePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: environments.stripe_publishable_key,
      locale: 'auto',
      token: (stripeToken: any) => {
        console.log(stripeToken);
        paymentstripe(stripeToken);
      }
    });

    const paymentstripe = (stripeToken: any) => {

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
            console.log(stripeToken);
          },
        });
      };

      window.document.body.appendChild(script);
    }
  }



}
