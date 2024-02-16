import { RouterModule, Routes } from "@angular/router";
import { AdminHomeComponent } from "./admin-home/admin-home.component";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { AdminUsersComponent } from "./admin-users/admin-users.component";
import { NgModule } from "@angular/core";




const routes: Routes=[
    {
        path:'home',
        title:'Careervilla | Dashboard',
        component:AdminHomeComponent
    },
    {
        path:'login',
        title:'Careervilla | Admin Login',
        component:AdminLoginComponent
    },
    {
        path:'users',
        title:'Careervilla | Users',
        component:AdminUsersComponent
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class AdminRoutingModule{}