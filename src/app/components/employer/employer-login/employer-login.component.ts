import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { validateByTrimming } from 'src/app/helpers/validations';
import { IEmployerAuthResponse, IRes } from 'src/app/models/employer';
import { AuthService } from 'src/app/services/auth.service';
import { EmployerService } from 'src/app/services/employer.service';
import { emailValidators, passwordValidators } from 'src/app/shared/validators';

@Component({
  selector: 'app-employer-login',
  templateUrl: './employer-login.component.html',
  styleUrls: ['./employer-login.component.css'],
})

export class EmployerLoginComponent implements OnInit,OnDestroy {

  isSubmitted: boolean = false
  form!: FormGroup
  authSubscription!:Subscription

  constructor(private readonly formBuilder: FormBuilder,
    private readonly employerService: EmployerService,
    private readonly router: Router,
    private authService: AuthService,
    private socialAuthService: SocialAuthService) { }
  
    ngOnDestroy(): void {
      this.authSubscription.unsubscribe();
    }
  

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [validateByTrimming(emailValidators)]],
      password: ['', [validateByTrimming(passwordValidators)]]
    })

    this.authSubscription = this.socialAuthService.authState.subscribe((user) => {
      console.log(user)
    });
  }

  googleSignin(googleWrapper: any) {
    googleWrapper.click();
  }

  

  onSubmit() {
    this.isSubmitted = true
    if (this.form.valid) {
      const data = this.form.getRawValue()
      this.employerService.login(data.email, data.password).subscribe({
        next: (res: IEmployerAuthResponse) => {
          if (res.data.success) {
            const jwtToken = res.data.token
            if (jwtToken) {
              this.authService.setToken('employerToken', jwtToken)
            }
            void this.router.navigate(['/employer/home'])
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
      this.employerService.forgotPassword(email.value).subscribe({
        next: (res: IRes) => {
          if (res.success) {
            void this.router.navigate(['/employer/otp'])
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
