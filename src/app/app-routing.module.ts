import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/common/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'admin',
    title: 'Admin',
    loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'employer',
    title: 'Employer',
    loadChildren: () => import('./components/employer/employer.module').then(m => m.EmployerModule)
  },
  {
    path: 'jobseeker',
    title: 'Jobseeker',
    loadChildren: () => import('./components/jobseeker/jobseeker.module').then(m => m.JobseekerModule)
  },
  {
    path: '',
    redirectTo: 'jobseeker/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    title: 'Careervilla | Page Not Found',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


