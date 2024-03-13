import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService, private router: Router) { }
    
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isAuthenticated()) {
            return true
        } else {
            const userRole = this.authService.getUserRole()
            switch (userRole) {
                case 'admin':
                    this.router.navigate(['/admin/login'])
                    break
                case 'employer':
                    this.router.navigate(['/employer/login'])
                    break
                case 'jobseeker':
                    this.router.navigate(['/jobseeker/login'])
                    break
                default:
                    break
            }
            return false
        }
        
    }
}