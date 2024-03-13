import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { MaterialModule } from "src/app/material/material.module";
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminJobseekersComponent } from './admin-jobseekers/admin-jobseekers.component';
import { AdminEmployersComponent } from "./admin-employers/admin-employers.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AdminTableComponent } from "./admin-table/admin-table.component";
import { AdminSubscriptionComponent } from './admin-subscription/admin-subscription.component';
import { AdminReportedJobsComponent } from './admin-reported-jobs/admin-reported-jobs.component';
import { AdminPlansDialogComponent } from './admin-plans-dialog/admin-plans-dialog.component';
import { AdminService } from "src/app/services/admin.service";


@NgModule({
    declarations:[
        AdminLoginComponent,
        AdminLayoutComponent,
        AdminDashboardComponent,
        AdminJobseekersComponent,
        AdminEmployersComponent,
        AdminSubscriptionComponent,
        AdminReportedJobsComponent,
        AdminPlansDialogComponent,
        
    ],
    imports:[
        AdminRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        AdminTableComponent,
        CommonModule
    ],
    providers:[AdminService]
})
export class AdminModule{}