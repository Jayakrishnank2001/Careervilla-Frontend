import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService, private router: Router) { }
    
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isAuthenticated()) {
            return true
        } else {
            this.router.navigate(['/admin/login'])
            return false
        }
        
    }
}