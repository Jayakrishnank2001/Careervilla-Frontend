import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobseekerLoginComponent } from './components/jobseeker/jobseeker-login/jobseeker-login.component';

const routes: Routes = [
  {
    path:'admin',
    title:'Admin',
    loadChildren: () =>import('./components/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path:'employer',
    title:'Employer',
    loadChildren: () =>import('./components/employer/employer.module').then(m =>m.EmployerModule)
  },
  {
    path:'jobseeker',
    title:'Jobseeker',
    loadChildren: () =>import('./components/jobseeker/jobseeker.module').then(m =>m.JobseekerModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


