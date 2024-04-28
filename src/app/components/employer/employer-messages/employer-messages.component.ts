import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMessage } from 'src/app/models/message';
import { AuthService } from 'src/app/services/auth.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-employer-messages',
  templateUrl: './employer-messages.component.html',
  styleUrls: ['./employer-messages.component.css']
})
export class EmployerMessagesComponent implements OnInit {

  jobseekerId!: string | null
  firstName!: string | null
  lastName!: string | null
  image!: string | null
  messages: IMessage[] = []
  employerId!: string | null

  constructor(private _route: ActivatedRoute,
    private _socketService: WebSocketService,
    private _authService: AuthService) { }

  ngOnInit(): void {
    this.employerId = this._authService.extractUserIdFromToken('employerToken')
    this._route.queryParamMap.subscribe((params) => {
      this.jobseekerId = params.get('jobseekerId')
      this.firstName = params.get('firstName')
      this.lastName = params.get('lastName')
      this.image = params.get('image')
    })
    this.getMessages()
  }

  getMessages(): void {
    if (this.jobseekerId && this.employerId)
      this._socketService.getMessages(this.employerId, this.jobseekerId, 'employer').subscribe({
        next: (res) => {
          this.messages = res
          console.log(this.messages)
        }
      })
  }









}
