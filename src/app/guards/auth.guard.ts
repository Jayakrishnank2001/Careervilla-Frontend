import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const url = state.url;
        const segments = url.split('/');
        const role = segments[segments.length - 2];
        let tokenKey
        if (role == 'admin') {
            tokenKey = 'adminToken'
        } else if (role == 'employer') {
            tokenKey = 'employerToken'
        } else if (role == 'jobseeker') {
            tokenKey = 'jobseekerToken'
        } else {
            tokenKey = ''
        }
        if (this.authService.isAuthenticated(tokenKey)) {
            return true
        } else {
            switch (role) {
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