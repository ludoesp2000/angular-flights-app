import { UserSessionService } from './user-session.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  // GUARD CHE TI MANDA ALLA LOGIN SE NON SEI LOGGATO, => vedi app-routing.module.ts

  constructor(private userSessionService: UserSessionService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let canNavigate = true
    if (!this.userSessionService.isLoggedAnyone()) {
      this.router.navigateByUrl('/login')
      canNavigate = false
    }
    return  canNavigate
  }
}
