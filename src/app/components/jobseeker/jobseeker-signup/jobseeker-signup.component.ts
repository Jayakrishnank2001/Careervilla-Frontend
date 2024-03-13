import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator, validateByTrimming } from 'src/app/helpers/validations';
import { JobseekerService } from 'src/app/services/jobseeker.service';
import { emailValidators, firstnameValidators, lastnameValidators, mobileValidators, passwordValidators } from 'src/app/shared/validators';

@Component({
  selector: 'app-jobseeker-signup',
  templateUrl: './jobseeker-signup.component.html',
  styleUrls: ['./jobseeker-signup.component.css']
})
export class JobseekerSignupComponent implements OnInit{

  form!: FormGroup
  isSubmitted: boolean = false
  
  constructor(private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly jobseekerService: JobseekerService) { }
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [validateByTrimming(firstnameValidators)]],
      lastName: ['', [validateByTrimming(lastnameValidators)]],
      email: ['', [validateByTrimming(emailValidators)]],
      phoneNumber: ['', [validateByTrimming(mobileValidators)]],
      password: ['', [validateByTrimming(passwordValidators)]],
      confirmPassword:['',Validators.required]
    }, { validators: passwordMatchValidator })
  }

  onSubmit(): void{
    this.isSubmitted = true
    if (this.form.valid) {
      const data = this.form.getRawValue()
      this.jobseekerService.signup(data).subscribe({
        next: ()=>{
            void this.router.navigate(['/jobseeker/otp'])
        },
        error: (error) => {
          console.error(error)
        }
      })
    }
  }


}
