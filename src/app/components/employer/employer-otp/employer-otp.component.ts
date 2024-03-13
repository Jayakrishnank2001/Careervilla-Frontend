import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { validateByTrimming } from 'src/app/helpers/validations';
import { IEmployerAuthResponse, IRes } from 'src/app/models/employer';
import { EmployerService } from 'src/app/services/employer.service';
import { otpValidators } from 'src/app/shared/validators';

@Component({
  selector: 'app-employer-otp',
  templateUrl: './employer-otp.component.html',
  styleUrls: ['./employer-otp.component.css']
})
export class EmployerOTPComponent implements OnInit, OnDestroy {
  otpTimer!: number
  private timerInterval!: number
  isSubmitted: boolean = false
  form!: FormGroup

  constructor(private readonly formBuilder: FormBuilder,
    private readonly employerService: EmployerService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.otpTimer = 60
    this.startTimer()
    this.form = this.formBuilder.group({
      otp: ['', [validateByTrimming(otpValidators)]]
    })

  }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      if (this.otpTimer > 0) {
        this.otpTimer--
      } else {
        clearInterval(this.timerInterval)
      }
    }, 1000) as unknown as number
  }

  resendOTP(): void {
    this.otpTimer = 60
    this.startTimer()
    this.employerService.resendOTP().subscribe({
      next: (res: IRes) => {
        console.log(res.message)
      }
    })
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval)
  }

  onSubmit():void {
    this.isSubmitted = true
    if (this.form.valid) {
      console.log(this.form)
      const data = this.form.getRawValue()
      this.employerService.verifyOTP(data.otp).subscribe({
        next: (res: IEmployerAuthResponse) => {
          if (!res) {
            void this.router.navigate(['/employer/forgot-password'])
          } else if(res.data.userId) {
            void this.router.navigate(['/employer/login'])
          }
        },
        error: (error) => {
          console.error(error)
        }
      })
    }
  }

}
