import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployerLoginComponent } from "./employer-login/employer-login.component";



const routes: Routes = [
    {
        path: 'login',
        title: 'Careervilla | Employer Login',
        component:EmployerLoginComponent
    }

]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class EmployerRoutingModule{}