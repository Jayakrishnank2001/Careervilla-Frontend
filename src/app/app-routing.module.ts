import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobseekerHomeComponent } from './components/jobseeker/jobseeker-home/jobseeker-home.component';

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
  {
    path: '',
    title: 'Careervilla Homepage',
    component:JobseekerHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


