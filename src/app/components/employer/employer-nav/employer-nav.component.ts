import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employer-nav',
  templateUrl: './employer-nav.component.html',
  styleUrls: ['./employer-nav.component.css']
})
export class EmployerNavComponent implements OnInit {

  token!: string | null

  screenSize: Observable<string>;

  isMenuOpen = true;

  constructor(private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router) {
    this.screenSize = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(
        map(breakpointState => breakpointState.matches ? 'small' : 'large')
      );
  }

  ngOnInit() {
    this.token=this.authService.getToken('employerToken')
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onLogOut(): void {
    void Swal.fire({
      title: 'Do you want to Logout ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'No, Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        this.authService.clearToken('employerToken')
        void this.router.navigate(['/employer/login'])
      }
    })
  }
}
