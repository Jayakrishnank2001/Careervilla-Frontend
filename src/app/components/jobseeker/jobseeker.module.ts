import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JobseekerRoutingModule } from "./jobseeker-routing.module";
import { JobseekerLoginComponent } from './jobseeker-login/jobseeker-login.component';
import { JobseekerNavComponent } from './jobseeker-nav/jobseeker-nav.component';
import { MaterialModule } from "src/app/material/material.module";
import { JobseekerForgotPasswordComponent } from './jobseeker-forgot-password/jobseeker-forgot-password.component';
import { JobseekerLoginLayoutComponent } from './jobseeker-login-layout/jobseeker-login-layout.component';
import { JobseekerOtpComponent } from './jobseeker-otp/jobseeker-otp.component';
import { JobseekerLoginFooterComponent } from './jobseeker-login-footer/jobseeker-login-footer.component';
import { JobseekerSignupComponent } from './jobseeker-signup/jobseeker-signup.component';
import { JobseekerHomeComponent } from './jobseeker-home/jobseeker-home.component';


@NgModule({
    declarations: [
        JobseekerLoginComponent,
        JobseekerNavComponent,
        JobseekerForgotPasswordComponent,
        JobseekerLoginLayoutComponent,
        JobseekerOtpComponent,
        JobseekerLoginFooterComponent,
        JobseekerSignupComponent,
        JobseekerHomeComponent
    ],
    imports: [
        JobseekerRoutingModule,
        MaterialModule,
        CommonModule
    ],
})
export class JobseekerModule { }