import { NgModule } from "@angular/core";
import { JobseekerRoutingModule } from "./jobseeker-routing.module";
import { JobseekerLoginComponent } from './jobseeker-login/jobseeker-login.component';
import { JobseekerNavComponent } from './jobseeker-nav/jobseeker-nav.component';
import { MaterialModule } from "src/app/material/material.module";
import { JobseekerForgotPasswordComponent } from './jobseeker-forgot-password/jobseeker-forgot-password.component';
import { JobseekerLoginLayoutComponent } from './jobseeker-login-layout/jobseeker-login-layout.component';
import { JobseekerOtpComponent } from './jobseeker-otp/jobseeker-otp.component';
import { JobseekerLoginFooterComponent } from './jobseeker-login-footer/jobseeker-login-footer.component';
import { JobseekerSignupComponent } from './jobseeker-signup/jobseeker-signup.component';



@NgModule({
    declarations: [
        JobseekerLoginComponent,
        JobseekerNavComponent,
        JobseekerForgotPasswordComponent,
        JobseekerLoginLayoutComponent,
        JobseekerOtpComponent,
        JobseekerLoginFooterComponent,
        JobseekerSignupComponent
    ],
    imports: [
        JobseekerRoutingModule,
        MaterialModule,
    ]
})
export class JobseekerModule { }