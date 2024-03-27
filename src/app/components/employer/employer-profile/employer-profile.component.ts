import { Component, OnInit } from '@angular/core';
import { IEmployerRes } from 'src/app/models/employer';
import { AuthService } from 'src/app/services/auth.service';
import { EmployerService } from 'src/app/services/employer.service';

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.css']
})
export class EmployerProfileComponent implements OnInit {

  userData:IEmployerRes={}

  constructor(private authService: AuthService,
    private employerService: EmployerService) { }

  ngOnInit(): void {
    this.employerProfile()
  }

  employerProfile(): void {
    const employerId = this.authService.extractUserIdFromToken('employerToken')
    if(employerId)
      this.employerService.getEmployerDetails(employerId).subscribe({
        next: (res) => {
          console.log(res)
          this.userData=res
      }
  })
  }

}
