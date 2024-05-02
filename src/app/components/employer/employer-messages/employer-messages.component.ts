import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IChat } from 'src/app/models/chat';
import { IJobseekerRes } from 'src/app/models/jobseeker';
import { IMessage } from 'src/app/models/message';
import { AuthService } from 'src/app/services/auth.service';
import { JobseekerService } from 'src/app/services/jobseeker.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-employer-messages',
  templateUrl: './employer-messages.component.html',
  styleUrls: ['./employer-messages.component.css']
})
export class EmployerMessagesComponent implements OnInit {

  jobseekerId!: string | null
  jobseekerDetails: IJobseekerRes = {}
  messages: IMessage[] = []
  employerId!: string | null
  form!: FormGroup
  chats: IChat[] = []
  showMessages:boolean=false

  constructor(
    @Inject(ActivatedRoute) private _route: ActivatedRoute,
    @Inject(WebSocketService) private _socketService: WebSocketService,
    @Inject(AuthService) private _authService: AuthService,
    @Inject(FormBuilder) private _fb: FormBuilder,
    @Inject(JobseekerService) private _jobseekerService: JobseekerService) { }

  ngOnInit(): void {
    this.employerId = this._authService.extractUserIdFromToken('employerToken')
    this._route.queryParamMap.subscribe((params) => {
      this.jobseekerId = params.get('jobseekerId')
    })
    this.form = this._fb.group({
      message: ['']
    })
    this.getAllChats()
    this.getMessages(this.jobseekerId)
  }

  getMessages(jobseekerId: string | null): void {
    if (jobseekerId && this.employerId) {
      this.getJobseekerDetails(jobseekerId)
      this._socketService.getMessages(this.employerId, jobseekerId, 'employer').subscribe({
        next: (res) => {
          this.messages = res
          this.showMessages=true
        }
      })
    }
  }

  onSubmit(): void {
    const data = this.form.getRawValue()
    if (this.jobseekerId && this.employerId)
      this._socketService.sendMessage(this.employerId, this.jobseekerId, data.message, 'employer').subscribe({
        next: (res) => {
          if (res.data.success == true) {
            this.form.reset()
            this.getMessages(this.jobseekerId)
            this.getAllChats()
          }
        }
      })
  }

  getAllChats(): void {
    if (this.employerId)
      this._socketService.getAllChats(this.employerId, 'employer').subscribe({
        next: (res) => {
          this.chats = res
        }
      })
  }

  getJobseekerDetails(jobseekerId: string): void {
    this._jobseekerService.getJobseekerDetails(jobseekerId).subscribe({
      next: (res) => {
        this.jobseekerDetails = res
        this.jobseekerId=res._id || null
      }
    })
  }









}
