import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";
import { EmployerLoginComponent } from "./employer-login/employer-login.component";
import { EmployerOTPComponent } from "./employer-otp/employer-otp.component";
import { EmployerForgotPasswordComponent } from "./employer-forgot-password/employer-forgot-password.component";
import { EmployerSignupComponent } from "./employer-signup/employer-signup.component";
import { EmployerHomeComponent } from "./employer-home/employer-home.component";
import { EmployerPostJobComponent } from "./employer-post-job/employer-post-job.component";
import { EmployerSubscriptionComponent } from "./employer-subscription/employer-subscription.component";
import { AuthGuard } from "src/app/guards/auth.guard";


const routes: Routes = [
    {
        path: 'login',
        title: 'Careervilla | Employer Login',
        component:EmployerLoginComponent
    },
    {
        path: 'otp',
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
    },
    {
        path: 'home',
        title: 'Careervilla | Employer Homepage',
        component: EmployerHomeComponent,
        canActivate:[AuthGuard]
    },
    {
        path: 'post-job',
        title: 'Careervilla | Employer Post-Job',
        component: EmployerPostJobComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'subscription',
        title: 'Careervilla | Employer Subscription',
        component: EmployerSubscriptionComponent,
        canActivate:[AuthGuard]
    }

]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class EmployerRoutingModule{}