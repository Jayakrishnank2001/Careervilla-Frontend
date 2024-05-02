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
import { EmployerProfileComponent } from "./employer-profile/employer-profile.component";
import { EmployerSettingsComponent } from "./employer-settings/employer-settings.component";
import { EmployerManageJobsComponent } from "./employer-manage-jobs/employer-manage-jobs.component";
import { EmployerManageCandidatesComponent } from "./employer-manage-candidates/employer-manage-candidates.component";
import { EmployerMessagesComponent } from "./employer-messages/employer-messages.component";
import { EmployerNotificationsComponent } from "./employer-notifications/employer-notifications.component";

const routes: Routes = [
    {
        path: 'login',
        title: 'Careervilla | Employer Login',
        component: EmployerLoginComponent
    },
    {
        path: 'otp',
        title: 'Carrervilla | Employer Forgot OTP',
        component: EmployerOTPComponent
    },
    {
        path: 'forgot-password',
        title: 'Carrervilla | Employer Forgot Password',
        component: EmployerForgotPasswordComponent
    },
    {
        path: 'signup',
        title: 'Careervilla | Employer Signup',
        component: EmployerSignupComponent
    },
    {
        path: 'home',
        title: 'Careervilla | Employer Homepage',
        component: EmployerHomeComponent,
        canActivate: [AuthGuard]
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
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        title: 'Careervilla | Employer Profile',
        component: EmployerProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'settings',
        title: 'Careervilla | Employer Settings',
        component: EmployerSettingsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'manage-jobs',
        title: 'Careervilla | Employer Manage Jobs',
        component: EmployerManageJobsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'manage-candidates',
        title: 'Careervilla | Employer Manage Candidates',
        component: EmployerManageCandidatesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'messages',
        title: 'Careervilla | Employer Messages',
        component: EmployerMessagesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'notifications',
        title: 'Careervilla | Employer Notifications',
        component: EmployerNotificationsComponent,
        canActivate: [AuthGuard]
    }

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployerRoutingModule { }