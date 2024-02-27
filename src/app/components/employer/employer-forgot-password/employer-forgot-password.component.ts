import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator, validateByTrimming } from 'src/app/helpers/validations';
import { IRes } from 'src/app/models/employer';
import { EmployerService } from 'src/app/services/employer.service';
import { passwordValidators } from 'src/app/shared/validators';

@Component({
  selector: 'app-employer-forgot-password',
  templateUrl: './employer-forgot-password.component.html',
  styleUrls: ['./employer-forgot-password.component.css']
})
export class EmployerForgotPasswordComponent implements OnInit {

  form!: FormGroup
  isSubmitted: boolean = false

  constructor(private readonly router: Router,
    private readonly employerService: EmployerService,
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
      this.employerService.resetPassword(data.newPassword, data.confirmPassword).subscribe({
        next: (res: IRes) => {
          if (res.success) {
            void this.router.navigate(['/employer/login'])
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
