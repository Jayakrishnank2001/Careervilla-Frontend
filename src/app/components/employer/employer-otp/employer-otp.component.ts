import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-employer-otp',
  templateUrl: './employer-otp.component.html',
  styleUrls: ['./employer-otp.component.css']
})
export class EmployerOTPComponent implements OnInit, OnDestroy{
  otpTimer!: number
  private timerInterval: any
  
  ngOnInit(): void {
    this.otpTimer = 60
    this.startTimer()
    
  }

  startTimer(): void{
    this.timerInterval = setInterval(() => {
      if (this.otpTimer > 0) {
        this.otpTimer--
      } else {
        clearInterval(this.timerInterval)
      }
    },1100)
  }

  resendOTP(): void{
    this.otpTimer = 60
    this.startTimer()
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval)
  }

}
