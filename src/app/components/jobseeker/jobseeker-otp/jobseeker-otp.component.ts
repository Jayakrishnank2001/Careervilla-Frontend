import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { validateByTrimming } from 'src/app/helpers/validations';
import { IResponse } from 'src/app/models/common';
import { IJobseekerAuthResponse, IRes } from 'src/app/models/jobseeker';
import { JobseekerService } from 'src/app/services/jobseeker.service';
import { otpValidators } from 'src/app/shared/validators';

@Component({
  selector: 'app-jobseeker-otp',
  templateUrl: './jobseeker-otp.component.html',
  styleUrls: ['./jobseeker-otp.component.css']
})
export class JobseekerOtpComponent implements OnInit, OnDestroy{

  form!: FormGroup
  otpTimer!: number
  private timerInterval!: number
  isSubmitted: boolean = false
  
  constructor(private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly jobseekerService: JobseekerService) { }
  
  ngOnInit(): void {
    this.otpTimer = 60
    this.startTimer()
    this.form = this.formBuilder.group({
      otp:['',[validateByTrimming(otpValidators)]]
    })
  }

  startTimer():void {
    this.timerInterval = setInterval(() => {
      if (this.otpTimer > 0) {
        this.otpTimer--
      } else {
        clearInterval(this.timerInterval)
      }
    },1000)as unknown as number
  }

  resendOTP(): void{
    this.otpTimer = 60
    this.startTimer()
    this.jobseekerService.resendOTP().subscribe({
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
      const data = this.form.getRawValue()
      this.jobseekerService.verifyOTP(data.otp).subscribe({
        next: (res: IJobseekerAuthResponse) => {
          if (!res) {
            void this.router.navigate(['/jobseeker/forgot-password'])
          } else if(res.data.userId){
            void this.router.navigate(['/jobseeker/login'])
          }
        },
        error: (error) => {
          console.error(error)
        }
      })
    }
  }


}
