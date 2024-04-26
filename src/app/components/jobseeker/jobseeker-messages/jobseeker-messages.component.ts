import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICompany } from 'src/app/models/company';
import { IEmployerRes } from 'src/app/models/employer';
import { IJobRes } from 'src/app/models/job';
import { IMessage } from 'src/app/models/message';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';
import { EmployerService } from 'src/app/services/employer.service';
import { JobService } from 'src/app/services/job.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-jobseeker-messages',
  templateUrl: './jobseeker-messages.component.html',
  styleUrls: ['./jobseeker-messages.component.css']
})
export class JobseekerMessagesComponent implements OnInit {

  form!: FormGroup
  jobId!: string | null
  job: IJobRes = {}
  jobseekerId!: string | null
  messages: IMessage[] = []
  employerId!: string | null

  constructor(private _route: ActivatedRoute,
    private _jobService: JobService,
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _socketService: WebSocketService) { }

  ngOnInit(): void {
    this.jobseekerId = this._authService.extractUserIdFromToken('jobseekerToken')
    this._route.queryParamMap.subscribe((params) => {
      this.jobId = params.get('jobId')
      this.employerId = params.get('employerId')
    })
    this.getJobDetails(this.jobId)
    this.form = this._fb.group({
      message: ['']
    })
    this.getMessages()
  }

  getJobDetails(jobId: string | null): void {
    if (jobId)
      this._jobService.getJobDetails(jobId).subscribe({
        next: (res) => {
          this.job = res
        }
      })
  }

  getMessages(): void {
    console.log(this.jobseekerId,this.employerId)
    if (this.jobseekerId && this.employerId)
      this._socketService.getMessages(this.jobseekerId, this.employerId).subscribe({
        next: (res) => {
          this.messages = res
          console.log(this.messages)
        }
      })
  }

  onSubmit(): void {
    const data = this.form.getRawValue()
    if (this.jobseekerId && this.employerId)
      this._socketService.sendMessage(this.jobseekerId, this.employerId, data.message,'jobseeker').subscribe({
        next: (res) => {
          if (res.data.success == true) {
            this.form.reset()
            this.ngOnInit()
          }
        }
      })
  }



}
