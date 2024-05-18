import { formatDate } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

export class JobseekerMessagesComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('chatContainer') chatContainer!: ElementRef<HTMLDivElement>;

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

  ngOnDestroy(): void {
    this._socketService.disconnectSocket()
  }

  getMessages(employerId: string | null): void {
    if (this.jobseekerId && employerId) {
      this.getReceiverDetails(employerId)
      this._messageService.getMessages(this.jobseekerId, employerId, 'jobseeker').subscribe({
        next: (res) => {
          this.messages = res
          this.showMessages = true
        }
      })
    }
  }

  updateMessage(): void {
    this.getMessages(this.employerId)
    this.getAllChats()
  }


  sendMessage(): void {
    let message = this.form.getRawValue()
    const messageData = { senderId: this.jobseekerId, receiverId: this.employerId, message: message.message }
    this._socketService.emit('send-message', messageData);
    this.form.get('message')!.setValue('');
    if (this.jobseekerId && this.employerId)
      this.messages.push({ senderId: this.jobseekerId, receiverId: this.employerId, message: message.message })
    this.getMessages(this.employerId)
    this.getAllChats()
    this.scrollToBottom()
  }

  getAllChats(): void {
    if (this.jobseekerId)
      this._messageService.getAllChats(this.jobseekerId, 'jobseeker').subscribe({
        next: (res) => {
          this.chats = res.reverse()
          console.log(this.chats)
        }
      })
  }

  getReceiverDetails(employerId: string): void {
    this._messageService.getEmployerAsReceiver(employerId,'jobseeker').subscribe({
      next: (res) => {
        this.employerDetails = res
        this.employerId = res._id || null
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
