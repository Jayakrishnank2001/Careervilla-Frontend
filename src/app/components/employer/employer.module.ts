import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmployerRoutingModule } from "./employer-routing.module";
import { EmployerLoginComponent } from './employer-login/employer-login.component';
import { EmployerNavComponent } from './employer-nav/employer-nav.component';
import { MaterialModule } from "src/app/material/material.module";
import { EmployerLoginLayoutComponent } from './employer-login-layout/employer-login-layout.component';
import { EmployerOTPComponent } from './employer-otp/employer-otp.component';
import { EmployerForgotPasswordComponent } from './employer-forgot-password/employer-forgot-password.component';
import { EmployerLoginFooterComponent } from './employer-login-footer/employer-login-footer.component';
import { EmployerSignupComponent } from './employer-signup/employer-signup.component';
import { EmployerHomeComponent } from './employer-home/employer-home.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { EmployerFooterComponent } from './employer-footer/employer-footer.component';
import { EmployerPostJobComponent } from './employer-post-job/employer-post-job.component';
import { EmployerSubscriptionComponent } from './employer-subscription/employer-subscription.component';

@NgModule({
    declarations: [
        EmployerLoginComponent,
        EmployerNavComponent,
        EmployerLoginLayoutComponent,
        EmployerOTPComponent,
        EmployerForgotPasswordComponent,
        EmployerLoginFooterComponent,
        EmployerSignupComponent,
        EmployerHomeComponent,
        EmployerFooterComponent,
        EmployerPostJobComponent,
        EmployerSubscriptionComponent
    ],
    imports: [
        EmployerRoutingModule,
        MaterialModule,
        CommonModule,
        ReactiveFormsModule,
        MatSidenavModule,
        MatIconModule,
        LayoutModule
    ]
})
export class EmployerModule { }