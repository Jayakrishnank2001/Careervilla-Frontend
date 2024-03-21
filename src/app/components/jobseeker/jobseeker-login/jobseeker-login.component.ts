import { SocialAuthService } from '@abacritt/angularx-social-login';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { validateByTrimming } from 'src/app/helpers/validations';
import { IJobseekerAuthResponse, IRes } from 'src/app/models/jobseeker';
import { AuthService } from 'src/app/services/auth.service';
import { JobseekerService } from 'src/app/services/jobseeker.service';
import { emailValidators, passwordValidators } from 'src/app/shared/validators';
import { saveJobseekerOnStore } from 'src/app/states/jobseeker/jobseeker.actions';

@Component({
  selector: 'app-jobseeker-login',
  templateUrl: './jobseeker-login.component.html',
  styleUrls: ['./jobseeker-login.component.css']
})
export class JobseekerLoginComponent implements OnInit, AfterViewInit, OnDestroy {

  isSubmitted: boolean = false
  form!: FormGroup
  authSubscription!: Subscription

  constructor(private readonly formBuilder: FormBuilder,
    private readonly jobseekerService: JobseekerService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly socialAuthService: SocialAuthService,
    private readonly store: Store) { }
  

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [validateByTrimming(emailValidators)]],
      password: ['', [validateByTrimming(passwordValidators)]]
    })
  }

  ngAfterViewInit(): void {
    this.authSubscription = this.socialAuthService.authState.subscribe((user) => {
      console.log(user)
      this.jobseekerService.googleLogin(user.email, user.firstName, user.photoUrl).subscribe({
        next: (res: IJobseekerAuthResponse) => {
          if (res.data.success) {
            const jwtToken = res.data.token
            if (jwtToken) {
              this.authService.setToken('jobseekerToken', jwtToken)
            }
            setTimeout(() => {
              window.location.reload()
            })
            void this.router.navigate(['/jobseeker/home'])
            if (res.data.data !== null) {
              this.store.dispatch(saveJobseekerOnStore({jobseekerDetails:res.data.data}))
            }
          } else {
            console.error(res.data.message)
          }
        },
        error: (error) => {
          console.error(error)
        }
      })
    })
  }

  googleSignin(googleWrapper: any) {
    googleWrapper.click();
  }

  onSubmit() {
    this.isSubmitted = true
    if (this.form.valid) {
      const data = this.form.getRawValue()
      this.jobseekerService.login(data.email, data.password).subscribe({
        next: (res: IJobseekerAuthResponse) => {
          if (res.data.success) {
            const jwtToken = res.data.token
            if (jwtToken) {
              this.authService.setToken('jobseekerToken', jwtToken)
            }
            void this.router.navigate(['/jobseeker/home'])
            if (res.data.data !== null) {
              this.store.dispatch(saveJobseekerOnStore({jobseekerDetails:res.data.data}))
            }
          } else {
            console.error(res.data.message)
          }
        },
        error: (error) => {
          console.error(error)
        }
      })
    }
  }

  onForgotPasswordClick(): void {
    const email = this.form.get('email')
    if (email && email.value) {
      this.jobseekerService.forgotPassword(email.value).subscribe({
        next: (res: IRes) => {
          if (res.success) {
            void this.router.navigate(['/jobseeker/otp'])
          } else {
            console.error(res.message)
          }
        },
        error: (error) => {
          console.error(error)
        }
      })
    }
  }
}
