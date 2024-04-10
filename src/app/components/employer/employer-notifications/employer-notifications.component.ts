import { Component, OnInit } from '@angular/core';
import { NotificationData } from 'src/app/models/notification';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-employer-notifications',
  templateUrl: './employer-notifications.component.html',
  styleUrls: ['./employer-notifications.component.css']
})
export class EmployerNotificationsComponent implements OnInit{

  employerId!: string | null
  notifications:NotificationData[] | undefined=[]

  constructor(private notificationService: NotificationService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.employerId = this.authService.extractUserIdFromToken('employerToken')
    this.getNotifications(this.employerId)
  }


  getNotifications(employerId: string | null): void{
    if (employerId) {
      this.notificationService.getEmployerNotifications(employerId).subscribe({
        next: (res) => {
          this.notifications = res.content
          this.notifications?.reverse()
        }
      })
    }
  }
  



}
