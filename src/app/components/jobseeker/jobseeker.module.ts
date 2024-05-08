import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JobseekerRoutingModule } from "./jobseeker-routing.module";
import { JobseekerLoginComponent } from './jobseeker-login/jobseeker-login.component';
import { JobseekerNavComponent } from './jobseeker-nav/jobseeker-nav.component';
import { MaterialModule } from "src/app/material/material.module";
import { JobseekerForgotPasswordComponent } from './jobseeker-forgot-password/jobseeker-forgot-password.component';
import { JobseekerLoginLayoutComponent } from './jobseeker-login-layout/jobseeker-login-layout.component';
import { JobseekerOtpComponent } from './jobseeker-otp/jobseeker-otp.component';
import { JobseekerLoginFooterComponent } from './jobseeker-login-footer/jobseeker-login-footer.component';
import { JobseekerSignupComponent } from './jobseeker-signup/jobseeker-signup.component';
import { JobseekerHomeComponent } from './jobseeker-home/jobseeker-home.component';
import { ReactiveFormsModule } from "@angular/forms";
import { JobseekerFooterComponent } from './jobseeker-footer/jobseeker-footer.component';
import { JobseekerService } from "src/app/services/jobseeker.service";
import { GoogleLoginComponent } from "../common/google-login/google-login.component";
import { SocialAuthServiceConfig, SocialLoginModule, GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { environments } from "src/environments/environment";
import { StoreModule } from "@ngrx/store";
import { jobSeekerReducer } from "src/app/states/jobseeker/jobseeker.reducer";
import { JobseekerJobsComponent } from './jobseeker-jobs/jobseeker-jobs.component';
import { JobseekerSettingsComponent } from './jobseeker-settings/jobseeker-settings.component';
import { ChangePasswordComponent } from "../common/change-password/change-password.component";
import { ChangePhoneNumberComponent } from "../common/change-phone-number/change-phone-number.component";
import { ChangeLocationComponent } from "../common/change-location/change-location.component";
import { JobseekerProfileComponent } from './jobseeker-profile/jobseeker-profile.component';
import { JobseekerQualificationsComponent } from './jobseeker-qualifications/jobseeker-qualifications.component';
import { JobseekerJobPreferencesComponent } from './jobseeker-job-preferences/jobseeker-job-preferences.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ReportJobComponent } from "../common/report-job/report-job.component";
import { ApplyJobDialogComponent } from './apply-job-dialog/apply-job-dialog.component';
import { JobseekerMyJobsComponent } from './jobseeker-my-jobs/jobseeker-my-jobs.component';
import { JobseekerMyReviewsComponent } from './jobseeker-my-reviews/jobseeker-my-reviews.component';
import { JobApplicationService } from "src/app/services/job-application.service";
import { JobseekerMessagesComponent } from './jobseeker-messages/jobseeker-messages.component';
import { WebSocketService } from "src/app/services/web-socket.service";
import { NotificationService } from "src/app/services/notification.service";
import { JobseekerCompanyComponent } from './jobseeker-company/jobseeker-company.component';
import { JobseekerCompaniesComponent } from './jobseeker-companies/jobseeker-companies.component';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { ReviewService } from "src/app/services/review.service";
import { JobseekerJobDetailsComponent } from './jobseeker-job-details/jobseeker-job-details.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from "@angular/forms";
import { EmployerService } from "src/app/services/employer.service";
import { MessageService } from "src/app/services/message.service";
import { RecentWorkDialogComponent } from './recent-work-dialog/recent-work-dialog.component';
import { HighestEducationDialogComponent } from './highest-education-dialog/highest-education-dialog.component';
import { AddSkillsDialogComponent } from './add-skills-dialog/add-skills-dialog.component';
import { AddLanguagesDialogComponent } from './add-languages-dialog/add-languages-dialog.component';
import { JobTitlesDialogComponent } from './job-titles-dialog/job-titles-dialog.component';
import { JobTypesDialogComponent } from './job-types-dialog/job-types-dialog.component';
import { AddPayDialogComponent } from './add-pay-dialog/add-pay-dialog.component';




@NgModule({
  declarations: [
    JobseekerLoginComponent,
    JobseekerNavComponent,
    JobseekerForgotPasswordComponent,
    JobseekerLoginLayoutComponent,
    JobseekerOtpComponent,
    JobseekerLoginFooterComponent,
    JobseekerSignupComponent,
    JobseekerHomeComponent,
    JobseekerFooterComponent,
    JobseekerJobsComponent,
    JobseekerSettingsComponent,
    JobseekerProfileComponent,
    JobseekerQualificationsComponent,
    JobseekerJobPreferencesComponent,
    ApplyJobDialogComponent,
    JobseekerMyJobsComponent,
    JobseekerMyReviewsComponent,
    JobseekerMessagesComponent,
    JobseekerCompanyComponent,
    JobseekerCompaniesComponent,
    ReviewDialogComponent,
    JobseekerJobDetailsComponent,
    RecentWorkDialogComponent,
    HighestEducationDialogComponent,
    AddSkillsDialogComponent,
    AddLanguagesDialogComponent,
    JobTitlesDialogComponent,
    JobTypesDialogComponent,
    AddPayDialogComponent,
  ],
  imports: [
    JobseekerRoutingModule,
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireStorageModule,
    StoreModule.forFeature('jobseeker', jobSeekerReducer),
    AngularFireModule.initializeApp(environments.firebaseConfig),
    SocialLoginModule,
    GoogleLoginComponent,
    ChangePasswordComponent,
    ChangePhoneNumberComponent,
    ChangeLocationComponent,
    ReportJobComponent,
    InfiniteScrollModule
  ],
  providers: [
    JobseekerService,
    JobApplicationService,
    NotificationService,
    ReviewService,
    EmployerService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environments.google_client_id, {
              scopes: 'openid profile email',
            }),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    }
  ]
})
export class JobseekerModule { }