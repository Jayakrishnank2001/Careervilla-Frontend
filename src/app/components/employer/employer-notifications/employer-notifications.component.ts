import { Component, Inject, OnInit } from '@angular/core';
import { NotificationData } from 'src/app/models/notification';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { environments } from 'src/environments/environment';


@Component({
  selector: 'app-employer-notifications',
  templateUrl: './employer-notifications.component.html',
  styleUrls: ['./employer-notifications.component.css']
})
export class EmployerNotificationsComponent implements OnInit {

  notifications: NotificationData[] = [];

  constructor(
    @Inject(AuthService) private _authService: AuthService,
    @Inject(NotificationService) private _notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getNotifications()
    this.getNewNotification()
  }

  getNewNotification(): void {
    const employerId = this._authService.extractUserIdFromToken('employerToken')
    if (employerId) {
      const eventSource = new EventSource(`${environments.baseURL}/employer/notifications/${employerId}`);

    eventSource.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      this.notifications.push(notification);
    };

    eventSource.onerror = () => {
      console.error('Error with SSE connection');
    };
    }
  }

  getNotifications(): void {
    const employerId = this._authService.extractUserIdFromToken('employerToken')
    if(employerId)
      this._notificationService.getEmployerNotifications(employerId).subscribe({
        next: (res) => {
          this.notifications = res.content || []
          this.notifications?.reverse()
        }
      })
  }




}
