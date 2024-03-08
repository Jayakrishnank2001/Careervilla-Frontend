import { RouterModule, Routes } from "@angular/router";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { NgModule } from "@angular/core";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminJobseekersComponent } from "./admin-jobseekers/admin-jobseekers.component";
import { AdminEmployersComponent } from "./admin-employers/admin-employers.component";
import { AdminSubscriptionComponent } from "./admin-subscription/admin-subscription.component";
import { AdminReportedJobsComponent } from "./admin-reported-jobs/admin-reported-jobs.component";

const routes: Routes = [
    {
        path:'login',
        title:'Careervilla | Admin Login',
        component:AdminLoginComponent
    },
    {
        path:'dashboard',
        title:'Careervilla | Dashboard',
        component:AdminDashboardComponent
    },
    {
        path:'jobseekers',
        title:'Careervilla | Jobseekers',
        component:AdminJobseekersComponent
    },
    {
        path: 'employers',
        title: 'Carrervilla | Employers',
        component:AdminEmployersComponent
    },
    {
        path: 'reported-jobs',
        title: 'Careervilla | Reported Jobs',
        component:AdminReportedJobsComponent

    },
    {
        path: 'subscription-plans',
        title: 'Careervilla | Subscription Plans',
        component:AdminSubscriptionComponent
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
    
export class AdminRoutingModule{}