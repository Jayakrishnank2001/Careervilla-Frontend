import { NgModule } from "@angular/core";
import { AdminHomeComponent } from "./admin-home/admin-home.component";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { AdminUsersComponent } from "./admin-users/admin-users.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { MaterialModule } from "src/app/material/material.module";
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';


@NgModule({
    declarations:[
        AdminHomeComponent,
        AdminLoginComponent,
        AdminUsersComponent,
        AdminLayoutComponent,
    ],
    imports:[
        AdminRoutingModule,
        MaterialModule
    ]
})
export class AdminModule{}