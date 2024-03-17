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
        JobseekerFooterComponent
    ],
    imports: [
        JobseekerRoutingModule,
        MaterialModule,
        CommonModule,
        ReactiveFormsModule,
        SocialLoginModule,
        GoogleLoginComponent
    ],
    providers: [
        JobseekerService,
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