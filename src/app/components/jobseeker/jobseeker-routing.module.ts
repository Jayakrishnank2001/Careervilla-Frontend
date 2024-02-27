import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";
import { JobseekerLoginComponent } from "./jobseeker-login/jobseeker-login.component";
import { JobseekerOtpComponent } from "./jobseeker-otp/jobseeker-otp.component";
import { JobseekerForgotPasswordComponent } from "./jobseeker-forgot-password/jobseeker-forgot-password.component";
import { JobseekerSignupComponent } from "./jobseeker-signup/jobseeker-signup.component";
import { JobseekerHomeComponent } from "./jobseeker-home/jobseeker-home.component";



const routes: Routes = [
    {
        path: 'login',
        title: 'Careervilla | Jobseeker Login',
        component:JobseekerLoginComponent
    },
    {
        path: 'otp',
        title: 'Careervilla | Jobseeker Forgot OTP',
        component:JobseekerOtpComponent
    },
    {
        path: 'forgot-password',
        title: 'Careervilla | Jobseeker Forgot Password',
        component:JobseekerForgotPasswordComponent
    },
    {
        path: 'signup',
        title: 'Careervilla | Jobseeker Signup',
        component:JobseekerSignupComponent
    },
    {
        path: 'home',
        title: 'Careervilla | Jobseeker Homepage',
        component:JobseekerHomeComponent
    }

]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class JobseekerRoutingModule{}