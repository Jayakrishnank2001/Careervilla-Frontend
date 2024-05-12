import { formatDate } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IChat } from 'src/app/models/chat';
import { IJobseekerRes } from 'src/app/models/jobseeker';
import { IMessage } from 'src/app/models/message';
import { AuthService } from 'src/app/services/auth.service';
import { JobseekerService } from 'src/app/services/jobseeker.service';
import { MessageService } from 'src/app/services/message.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-employer-messages',
  templateUrl: './employer-messages.component.html',
  styleUrls: ['./employer-messages.component.css']
})
export class EmployerMessagesComponent implements OnInit,OnDestroy,AfterViewChecked {
  @ViewChild('chatContainer') chatContainer!: ElementRef<HTMLDivElement>;

  jobseekerId!: string | null
  jobseekerDetails: IJobseekerRes = {}
  messages: IMessage[] = []
  employerId!: string | null
  form!: FormGroup
  chats: IChat[] = []
  showMessages: boolean = false

  constructor(
    @Inject(ActivatedRoute) private _route: ActivatedRoute,
    @Inject(WebSocketService) private _socketService: WebSocketService,
    @Inject(AuthService) private _authService: AuthService,
    @Inject(FormBuilder) private _fb: FormBuilder,
    @Inject(JobseekerService) private _jobseekerService: JobseekerService,
    @Inject(MessageService) private _messageService: MessageService) { 
    
      this.employerId = this._authService.extractUserIdFromToken('employerToken')
    if (this.employerId)
        this._socketService.connectSocket(this.employerId)
    }

  ngOnInit(): void {
    this._route.queryParamMap.subscribe((params) => {
      this.jobseekerId = params.get('jobseekerId')
    })
    this.form = this._fb.group({
      message: ['']
    })
    this.getAllChats()
    this.getMessages(this.jobseekerId)
    this._socketService.listen('receive-message').subscribe(() => { this.updateMessage() })
  }

  private scrollToBottom() {
    if (this.chatContainer) {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom()
  }

  ngOnDestroy (): void {
    this._socketService.disconnectSocket()
  }


  getMessages(jobseekerId: string | null): void {
    if (jobseekerId && this.employerId) {
      this.getJobseekerDetails(jobseekerId)
      this._messageService.getMessages(this.employerId, jobseekerId, 'employer').subscribe({
        next: (res) => {
          this.messages = res
          this.showMessages=true
        }
      })
    }
  }

  updateMessage (): void {
    this.getMessages(this.jobseekerId)
    this.getAllChats()
  }

  sendMessage(): void {
    const message = this.form.getRawValue()
    const messageData = { senderId: this.employerId, receiverId: this.jobseekerId, message: message.message }
    this._socketService.emit('send-message', messageData);
    this.form.reset()
    if (this.jobseekerId && this.employerId)
      this.messages.push({ senderId: this.employerId, receiverId: this.jobseekerId, message: message.message })
    this.getMessages(this.jobseekerId)
    this.getAllChats()
    this.scrollToBottom()
  }

  getAllChats(): void {
    if (this.employerId)
      this._messageService.getAllChats(this.employerId, 'employer').subscribe({
        next: (res) => {
          this.chats = res.reverse()
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

  isNewDate(index: number): boolean {
    if (index === 0) {
      return true;
    }
    const time = this.messages[index]?.time;
    const previousTime = this.messages[index - 1]?.time;

    if (time && previousTime) {
      const currentDate = formatDate(time, 'yyyy-MM-dd', 'en');
      const previousDate = formatDate(previousTime, 'yyyy-MM-dd', 'en');

      return currentDate !== previousDate;
    } else {
      return false;
    }
  }









}
