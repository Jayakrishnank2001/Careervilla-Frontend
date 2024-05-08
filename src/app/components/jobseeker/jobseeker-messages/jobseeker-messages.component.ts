import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IChat } from 'src/app/models/chat';
import { IEmployerRes } from 'src/app/models/employer';
import { IMessage } from 'src/app/models/message';
import { AuthService } from 'src/app/services/auth.service';
import { EmployerService } from 'src/app/services/employer.service';
import { MessageService } from 'src/app/services/message.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-jobseeker-messages',
  templateUrl: './jobseeker-messages.component.html',
  styleUrls: ['./jobseeker-messages.component.css']
})
export class JobseekerMessagesComponent implements OnInit, OnDestroy {

  form!: FormGroup
  jobseekerId!: string | null
  messages: IMessage[] = []
  employerId!: string | null
  chats: IChat[] = []
  showMessages: boolean = false
  employerDetails: IEmployerRes = {}

  constructor(
    @Inject(ActivatedRoute) private _route: ActivatedRoute,
    @Inject(FormBuilder) private _fb: FormBuilder,
    @Inject(AuthService) private _authService: AuthService,
    @Inject(WebSocketService) private _socketService: WebSocketService,
    @Inject(EmployerService) private _employerService: EmployerService,
    @Inject(MessageService) private _messageService: MessageService) {

    this.jobseekerId = this._authService.extractUserIdFromToken('jobseekerToken')
    if (this.jobseekerId)
      this._socketService.connectSocket(this.jobseekerId)
  }

  ngOnInit(): void {
    this._route.queryParamMap.subscribe((params) => {
      this.employerId = params.get('employerId')
    })
    this.form = this._fb.group({
      message: ['']
    })
    this.getAllChats()
    this.getMessages(this.employerId)
    this._socketService.listen('receive-message').subscribe((data) => { this.updateMessage(data) })
  }

  ngOnDestroy(): void {
    this._socketService.disconnectSocket()
  }

  getMessages(employerId: string | null): void {
    if (this.jobseekerId && employerId) {
      this.getEmployerDetails(employerId)
      this._messageService.getMessages(this.jobseekerId, employerId, 'jobseeker').subscribe({
        next: (res) => {
          this.messages = res
          this.showMessages = true
        }
      })
    }
  }

  updateMessage(res: IMessage): void {
    this.getMessages(this.employerId)
    this.getAllChats()
  }


  sendMessage(): void {
    const message = this.form.getRawValue()
    const messageData = { senderId: this.jobseekerId, receiverId: this.employerId, message: message.message }
    this._socketService.emit('send-message', messageData);
    this.form.reset()
    if (this.jobseekerId && this.employerId)
      this.messages.push({ senderId: this.jobseekerId, receiverId: this.employerId, message: message.message })
    this.getMessages(this.employerId)
    this.getAllChats()
  }

  getAllChats(): void {
    if (this.jobseekerId)
      this._messageService.getAllChats(this.jobseekerId, 'jobseeker').subscribe({
        next: (res) => {
          this.chats = res
        }
      })
  }

  getEmployerDetails(employerId: string): void {
    this._employerService.getEmployerDetails(employerId).subscribe({
      next: (res) => {
        this.employerDetails = res
        this.employerId = res._id || null
      }
    })

  }





}
