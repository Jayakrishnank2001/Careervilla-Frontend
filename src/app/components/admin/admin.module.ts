import { NgModule } from "@angular/core";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { MaterialModule } from "src/app/material/material.module";
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminJobseekersComponent } from './admin-jobseekers/admin-jobseekers.component';
import { AdminTableComponent } from "../common/admin-table/admin-table.component";
import { AdminEmployersComponent } from "./admin-employers/admin-employers.component";

@NgModule({
    declarations:[
        AdminLoginComponent,
        AdminLayoutComponent,
        AdminDashboardComponent,
        AdminJobseekersComponent,
        AdminEmployersComponent,
        AdminTableComponent
    ],
    imports:[
        AdminRoutingModule,
        MaterialModule
    ]
})
export class AdminModule{}