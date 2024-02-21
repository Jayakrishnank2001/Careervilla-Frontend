import { RouterModule, Routes } from "@angular/router";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { NgModule } from "@angular/core";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminJobseekersComponent } from "./admin-jobseekers/admin-jobseekers.component";
import { AdminEmployersComponent } from "./admin-employers/admin-employers.component";

const routes: Routes=[
    {
        path:'dashboard',
        title:'Careervilla | Dashboard',
        component:AdminDashboardComponent
    },
    {
        path:'login',
        title:'Careervilla | Admin Login',
        component:AdminLoginComponent
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
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
    
export class AdminRoutingModule{}