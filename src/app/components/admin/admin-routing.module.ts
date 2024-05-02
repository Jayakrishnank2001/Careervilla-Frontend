import { RouterModule, Routes } from "@angular/router";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { NgModule } from "@angular/core";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminJobseekersComponent } from "./admin-jobseekers/admin-jobseekers.component";
import { AdminEmployersComponent } from "./admin-employers/admin-employers.component";
import { AdminSubscriptionComponent } from "./admin-subscription/admin-subscription.component";
import { AdminReportedJobsComponent } from "./admin-reported-jobs/admin-reported-jobs.component";
import { AuthGuard } from "src/app/guards/auth.guard";
import { AdminIndustriesComponent } from "./admin-industries/admin-industries.component";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";

const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        title: 'Careervilla | Admin',
        children: [
            {
                path: 'dashboard',
                title: 'Careervilla | Admin Dashboard',
                component: AdminDashboardComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'jobseekers',
                title: 'Careervilla | Admin Jobseekers',
                component: AdminJobseekersComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'employers',
                title: 'Careervilla | Admin Employers',
                component: AdminEmployersComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'reported-jobs',
                title: 'Careervilla | Admin Reported-Jobs',
                component: AdminReportedJobsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'subscription-plans',
                title: 'Careervilla | Admin Subscription-Plans',
                component: AdminSubscriptionComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'industries',
                title: 'Careervilla | Admin Industries',
                component: AdminIndustriesComponent,
                canActivate: [AuthGuard],
            },
        ],
    },
    {
        path: 'login',
        title: 'Careervilla | Admin Login',
        component: AdminLoginComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }