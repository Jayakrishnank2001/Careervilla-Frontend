import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { validateByTrimming } from 'src/app/helpers/validations';
import { IJobseekerAuthResponse, IRes } from 'src/app/models/jobseeker';
import { AuthService } from 'src/app/services/auth.service';
import { JobseekerService } from 'src/app/services/jobseeker.service';
import { emailValidators, passwordValidators } from 'src/app/shared/validators';

@Component({
  selector: 'app-jobseeker-login',
  templateUrl: './jobseeker-login.component.html',
  styleUrls: ['./jobseeker-login.component.css']
})
export class JobseekerLoginComponent implements OnInit {

  isSubmitted: boolean = false
  form!: FormGroup

  constructor(private readonly formBuilder: FormBuilder,
    private readonly jobseekerService: JobseekerService,
    private readonly router: Router,
    private readonly authService: AuthService) { }
  

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [validateByTrimming(emailValidators)]],
      password:['',[validateByTrimming(passwordValidators)]]
    })
    this.authService.setUserRole('jobseeker')
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
              this.authService.setToken(jwtToken)
            }
            void this.router.navigate(['/jobseeker/home'])
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

  onForgotPasswordClick(): void{
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
