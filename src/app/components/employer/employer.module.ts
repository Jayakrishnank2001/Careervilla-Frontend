import { NgModule } from "@angular/core";
import { EmployerRoutingModule } from "./employer-routing.module";
import { EmployerLoginComponent } from './employer-login/employer-login.component';
import { EmployerNavComponent } from './employer-nav/employer-nav.component';




@NgModule({
    declarations:[

    
    EmployerLoginComponent,
           EmployerNavComponent
  ],
    imports:[
        EmployerRoutingModule
    ]
})
export class EmployerModule{}