import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IAdminAuthResponse } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  form!: FormGroup
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly adminService: AdminService,
    private readonly authService:AuthService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [''],
      password: ['']
    })
    this.authService.setUserRole('admin')
  }

  submit() {
    console.log(this.form)
    if (this.form.valid) {
      const values = this.form.getRawValue()
      this.adminService.adminLogin(values.username, values.password).subscribe({
        next: (response:IAdminAuthResponse) => {
          const jwtToken = response.data.token
          if (jwtToken) {
            this.authService.setToken(jwtToken)
          }
          void this.router.navigate(['/admin/dashboard'])
        },
        error: (error) => {
          console.error('Login failed:',error)
        }
        
      })
    }
  }

}
