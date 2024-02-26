import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

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
    private readonly router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [''],
      password: ['']
    })
  }

  submit() {
    console.log(this.form)
    if (this.form.valid) {
      const values = this.form.getRawValue()
      this.adminService.adminLogin(values.username, values.password).subscribe({
        next: (response:any) => {
          console.log('Login successful:', response)
          
          const jwtToken = response.jwtToken
          localStorage.setItem('jwtToken',jwtToken)
          void this.router.navigate(['/admin/dashboard'])
        },
        error: (error:any) => {
          console.error('Login failed:',error)
        }
        
      })
    }
  }

}
