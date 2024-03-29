import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";
import { JobseekerLoginComponent } from "./jobseeker-login/jobseeker-login.component";
import { JobseekerOtpComponent } from "./jobseeker-otp/jobseeker-otp.component";
import { JobseekerForgotPasswordComponent } from "./jobseeker-forgot-password/jobseeker-forgot-password.component";
import { JobseekerSignupComponent } from "./jobseeker-signup/jobseeker-signup.component";
import { JobseekerHomeComponent } from "./jobseeker-home/jobseeker-home.component";
import { JobseekerJobsComponent } from "./jobseeker-jobs/jobseeker-jobs.component";
import { JobseekerSettingsComponent } from "./jobseeker-settings/jobseeker-settings.component";
import { AuthGuard } from "src/app/guards/auth.guard";
import { JobseekerProfileComponent } from "./jobseeker-profile/jobseeker-profile.component";
import { JobseekerQualificationsComponent } from "./jobseeker-qualifications/jobseeker-qualifications.component";
import { JobseekerJobPreferencesComponent } from "./jobseeker-job-preferences/jobseeker-job-preferences.component";



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
    },
    {
        path: 'jobs',
        title: 'Careervilla | Jobseeker Jobs',
        component:JobseekerJobsComponent
    },
    {
        path: 'settings',
        title: 'Careervilla | Jobseeker Settings',
        component: JobseekerSettingsComponent,
        canActivate:[AuthGuard]
    },
    {
        path: 'profile',
        title: 'Careervilla | Jobseeker Profile',
        component: JobseekerProfileComponent,
        canActivate:[AuthGuard]
    },
    {
        path: 'qualifications',
        title: 'Careervilla | Jobseeker Qualifications',
        component: JobseekerQualificationsComponent,
        canActivate:[AuthGuard]
    },
    {
        path: 'job-preferences',
        title: 'Careervilla | Jobseeker Job-Preferences',
        component: JobseekerJobPreferencesComponent,
        canActivate: [AuthGuard]
    }

]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class JobseekerRoutingModule{}