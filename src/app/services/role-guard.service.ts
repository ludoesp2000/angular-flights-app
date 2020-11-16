import { UserSessionService } from './user-session.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  // GUARD CHE VERIFICA SE L'UTENTE PUò ACCEDERE ALLA RISORSA RICHIESTA IN BASE AL SUO RUOLO => vedi app.module.ts

  constructor(private userSessionService: UserSessionService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let canNavigate = true
    if (!this.userSessionService.isLoggedAnyone()) {
      canNavigate = false
    } else {
      const userInRole = route.data.roles.find(e => e === this.userSessionService.getUser().role)
      if (!userInRole) {
        Swal.fire(
          'Auth',
          'Ops! Non sei autorizzato ad accedere a questa risorsa.'
        )
        canNavigate = false
      }
    }
    return  canNavigate
  }
}
