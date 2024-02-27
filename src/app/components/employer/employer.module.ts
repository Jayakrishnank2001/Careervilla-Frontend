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

@NgModule({
    declarations: [
        EmployerLoginComponent,
        EmployerNavComponent,
        EmployerLoginLayoutComponent,
        EmployerOTPComponent,
        EmployerForgotPasswordComponent,
        EmployerLoginFooterComponent,
        EmployerSignupComponent,
        EmployerHomeComponent
    ],
    imports: [
        EmployerRoutingModule,
        MaterialModule,
        CommonModule,
        ReactiveFormsModule
    ]
})
export class EmployerModule { }