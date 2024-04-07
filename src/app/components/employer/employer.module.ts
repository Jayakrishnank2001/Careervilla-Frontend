import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmployerRoutingModule } from "./employer-routing.module";
import { EmployerLoginComponent } from './employer-login/employer-login.component';
import { EmployerNavComponent } from './employer-nav/employer-nav.component';
import { MaterialModule } from "src/app/material/material.module";
import { EmployerLoginLayoutComponent } from './employer-login-layout/employer-login-layout.component';
import { EmployerOTPComponent } from './employer-otp/employer-otp.component';
import { EmployerForgotPasswordComponent } from './employer-forgot-password/employer-forgot-password.component';
import { EmployerLoginFooterComponent } from './employer-login-footer/employer-login-footer.component';
import { EmployerSignupComponent } from './employer-signup/employer-signup.component';
import { EmployerHomeComponent } from './employer-home/employer-home.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { EmployerFooterComponent } from './employer-footer/employer-footer.component';
import { EmployerPostJobComponent } from './employer-post-job/employer-post-job.component';
import { EmployerSubscriptionComponent } from './employer-subscription/employer-subscription.component';
import { EmployerService } from "src/app/services/employer.service";
import { SocialAuthServiceConfig, SocialLoginModule, GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { environments } from "src/environments/environment";
import { GoogleLoginComponent } from "../common/google-login/google-login.component";
import { StoreModule } from "@ngrx/store";
import { employerReducer } from "src/app/states/employer/employer.reducer";
import { EmployerProfileComponent } from './employer-profile/employer-profile.component';
import { EmployerSettingsComponent } from './employer-settings/employer-settings.component';
import { ChangePasswordComponent } from "../common/change-password/change-password.component";
import { ChangePhoneNumberComponent } from "../common/change-phone-number/change-phone-number.component";
import { ChangeLocationComponent } from "../common/change-location/change-location.component";
import { AngularFireModule } from "@angular/fire/compat";
import { JobApplicationService } from "src/app/services/job-application.service";
import { EmployerManageJobsComponent } from './employer-manage-jobs/employer-manage-jobs.component';
import { EmployerManageCandidatesComponent } from './employer-manage-candidates/employer-manage-candidates.component';
import { AddCompanyDialogComponent } from './add-company-dialog/add-company-dialog.component';

@NgModule({
  declarations: [
    EmployerLoginComponent,
    EmployerNavComponent,
    EmployerLoginLayoutComponent,
    EmployerOTPComponent,
    EmployerForgotPasswordComponent,
    EmployerLoginFooterComponent,
    EmployerSignupComponent,
    EmployerHomeComponent,
    EmployerFooterComponent,
    EmployerPostJobComponent,
    EmployerSubscriptionComponent,
    EmployerProfileComponent,
    EmployerSettingsComponent,
    EmployerManageJobsComponent,
    EmployerManageCandidatesComponent,
    AddCompanyDialogComponent
  ],
  imports: [
    EmployerRoutingModule,
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    AngularFireModule,
    StoreModule.forFeature('employer', employerReducer),
    AngularFireModule.initializeApp(environments.firebaseConfig),
    MatSidenavModule,
    MatIconModule,
    LayoutModule,
    SocialLoginModule,
    GoogleLoginComponent,
    ChangePasswordComponent,
    ChangePhoneNumberComponent,
    ChangeLocationComponent
  ],
  providers: [
    EmployerService,
    JobApplicationService,
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
export class EmployerModule { }