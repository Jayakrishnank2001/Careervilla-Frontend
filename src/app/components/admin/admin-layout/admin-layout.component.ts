import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent implements OnInit{
  screenSize: Observable<string>;

  isMenuOpen = true;

  constructor(private _breakpointObserver: BreakpointObserver,
    private readonly _authService: AuthService,
    private readonly _router: Router) {
    this.screenSize = this._breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(
        map(breakpointState => breakpointState.matches ? 'small' : 'large')
      );
  }

  ngOnInit(): void {
    
  }


  onLogout(): void {
    void Swal.fire({
      title: 'Do you want to Logout ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'No, Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        this._authService.clearToken('adminToken')
        void this._router.navigate(['/admin/login'])
      }
    })
  }

  isActive(route: string): boolean {
    return this._router.isActive(route, true);
  }

}