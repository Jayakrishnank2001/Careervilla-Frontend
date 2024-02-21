import { NgModule } from "@angular/core";
import { JobseekerRoutingModule } from "./jobseeker-routing.module";
import { JobseekerLoginComponent } from './jobseeker-login/jobseeker-login.component';




@NgModule({
    declarations:[

    
    JobseekerLoginComponent
  ],
    imports:[
        JobseekerRoutingModule
    ]
})
export class JobseekerModule{}