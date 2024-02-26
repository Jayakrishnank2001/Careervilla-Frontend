import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";
import { EmployerLoginComponent } from "./employer-login/employer-login.component";
import { EmployerOTPComponent } from "./employer-otp/employer-otp.component";
import { EmployerForgotPasswordComponent } from "./employer-forgot-password/employer-forgot-password.component";
import { EmployerSignupComponent } from "./employer-signup/employer-signup.component";



const routes: Routes = [
    {
        path: 'login',
        title: 'Careervilla | Employer Login',
        component:EmployerLoginComponent
    },
    {
        path: 'forgot-otp',
        title: 'Carrervilla | Employer Forgot OTP',
        component:EmployerOTPComponent
    },
    {
        path: 'forgot-password',
        title: 'Carrervilla | Employer Forgot Password',
        component:EmployerForgotPasswordComponent
    },
    {
        path: 'signup',
        title: 'Careervilla | Employer Signup',
        component:EmployerSignupComponent
    }

]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class EmployerRoutingModule{}