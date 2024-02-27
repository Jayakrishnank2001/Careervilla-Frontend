import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator, validateByTrimming } from 'src/app/helpers/validations';
import { IRes } from 'src/app/models/jobseeker';
import { JobseekerService } from 'src/app/services/jobseeker.service';
import { passwordValidators } from 'src/app/shared/validators';

@Component({
  selector: 'app-jobseeker-forgot-password',
  templateUrl: './jobseeker-forgot-password.component.html',
  styleUrls: ['./jobseeker-forgot-password.component.css']
})
export class JobseekerForgotPasswordComponent implements OnInit{

  form!: FormGroup
  isSubmitted: boolean = false

  constructor(private readonly router: Router,
    private readonly jobseekerService: JobseekerService,
    private readonly formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      newPassword: ['', [validateByTrimming(passwordValidators)]],
      confirmPassword:['',Validators.required]
    }, { validators: passwordMatchValidator })
  }

  onSubmit(): void{
    this.isSubmitted = true
    if (this.form.valid) {
      const data = this.form.getRawValue()
      this.jobseekerService.resetPassword(data.newPassword, data.confirmPassword).subscribe({
        next: (res: IRes) => {
          if (res.success) {
            void this.router.navigate(['/jobseeker/login'])
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
