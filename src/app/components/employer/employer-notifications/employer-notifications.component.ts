import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NotificationData } from 'src/app/models/notification';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-employer-notifications',
  templateUrl: './employer-notifications.component.html',
  styleUrls: ['./employer-notifications.component.css']
})
export class EmployerNotificationsComponent implements OnInit,OnDestroy {

  notifications: NotificationData[] = [];
  employerId!: string | null

  constructor(
    @Inject(AuthService) private _authService: AuthService,
    @Inject(NotificationService) private _notificationService: NotificationService,
    @Inject(WebSocketService) private _socketService: WebSocketService) {

    this.employerId = this._authService.extractUserIdFromToken('employerToken')
    if (this.employerId)
      this._socketService.connectSocket(this.employerId)
  }

  ngOnInit(): void {
    this.getNotifications()
    this._socketService.listen('receive-notification')
      .subscribe(() => {
        this.getNotifications();
      });
  }

  getNotifications(): void {
    if (this.employerId)
      this._notificationService.getEmployerNotifications(this.employerId).subscribe({
        next: (res) => {
          this.notifications = res.content || []
          this.notifications?.reverse()
        }
      })
  }

  ngOnDestroy (): void {
    this._socketService.disconnectSocket()
  }




}
