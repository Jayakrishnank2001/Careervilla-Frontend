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
import { JobseekerNotificationsComponent } from './jobseeker-notifications/jobseeker-notifications.component';
import { WebSocketService } from "src/app/services/web-socket.service";
import { NotificationService } from "src/app/services/notification.service";


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
    JobseekerNotificationsComponent,
  ],
  imports: [
    JobseekerRoutingModule,
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    StoreModule.forFeature('jobseeker', jobSeekerReducer),
    AngularFireModule.initializeApp(environments.firebaseConfig),
    SocialLoginModule,
    GoogleLoginComponent,
    ChangePasswordComponent,
    ChangePhoneNumberComponent,
    ChangeLocationComponent,
    ReportJobComponent
  ],
  providers: [
    JobseekerService,
    JobApplicationService,
    WebSocketService,
    NotificationService,
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