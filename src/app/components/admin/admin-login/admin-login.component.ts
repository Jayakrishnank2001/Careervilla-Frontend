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
    private readonly _formBuilder: FormBuilder,
    private readonly _adminService: AdminService,
    private readonly _authService:AuthService,
    private readonly _router: Router) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      username: [''],
      password: ['']
    })
  }

  submit() {
    console.log(this.form)
    if (this.form.valid) {
      const values = this.form.getRawValue()
      this._adminService.adminLogin(values.username, values.password).subscribe({
        next: (response: IAdminAuthResponse) => {
          console.log(response)
          const jwtToken = response.data.token
          if (jwtToken) {
            this._authService.setToken('adminToken',jwtToken)
          }
          void this._router.navigate(['/admin/dashboard'])
        },
        error: (error) => {
          console.error('Login failed:',error)
        }
        
      })
    }
  }

}
