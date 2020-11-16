import { UserSessionService } from './user-session.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProxyInterceptorService implements HttpInterceptor {

  // INTERCEPTOR DI TUTTE LE CHIAMATE HTTP, IN QUESTO CASO USATO PER IL JWT MA UTILE PER GESTIONE ERRORI ECC ECC

  constructor(public userSessionService: UserSessionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.userSessionService.isLoggedAnyone()) {
      const JWT_TOKEN = this.userSessionService.getUser().token

      req = req.clone({
        headers: req.headers.set('Content-type', 'application/json')
        .set('jwt', JWT_TOKEN),
      })
    } else {
      req = req.clone({
        headers: req.headers.set('Content-type', 'application/json')
      })

    }
    console.log('_HttpRequest proxy')

    return next.handle(req)
  }
}
