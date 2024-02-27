import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator, validateByTrimming } from 'src/app/helpers/validations';
import { EmployerService } from 'src/app/services/employer.service';
import { emailValidators, firstnameValidators, lastnameValidators, mobileValidators, passwordValidators } from 'src/app/shared/validators';

@Component({
  selector: 'app-employer-signup',
  templateUrl: './employer-signup.component.html',
  styleUrls: ['./employer-signup.component.css']
})
export class EmployerSignupComponent implements OnInit {

  isSubmitted: boolean = false
  form!: FormGroup

  constructor(private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly employerService: EmployerService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [validateByTrimming(firstnameValidators)]],
      lastName: ['', [validateByTrimming(lastnameValidators)]],
      email: ['', [validateByTrimming(emailValidators)]],
      phoneNumber: ['', [validateByTrimming(mobileValidators)]],
      password: ['', [validateByTrimming(passwordValidators)]],
      confirmPassword: ['',Validators.required]
    }, { validators: passwordMatchValidator })
  }

  onSubmit():void {
    this.isSubmitted = true
    if (this.form.valid) {
      const data = this.form.getRawValue()
      this.employerService.signup(data).subscribe({
        next: (res: any) => {
          console.log(res)
          void this.router.navigate(['/employer/otp'])
        }
      })
    }

  }

}
