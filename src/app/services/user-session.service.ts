import { User } from './../views/models/user.class';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  // CLASSE CHE RACCHIUDE TUTTE LE FUNZIONI CHE RIGUARDANO LA GESTIONE DI UN UTENTE

  constructor(private http: HttpClient) { }

  getUserById (user: User): Observable<User> {
    return this.http.get<User>(API_URL + '/user/' + user.id)
  }

  signIn (user: User): Observable<User> {
    return this.http.post<User>(API_URL + '/user' , user)
  }

  getRoles () {
    return [
      { label: 'Operator', value: 'operator' },
      { label: 'Viewer', value: 'viewer' }
    ]
  }

  saveUserData (user: User) {
    sessionStorage.setItem('id', user.id)
    sessionStorage.setItem('role', user.role)
    sessionStorage.setItem('jwt', user.token)
  }

  logout () {
    sessionStorage.removeItem('id')
    sessionStorage.removeItem('role')
    sessionStorage.removeItem('jwt')
  }

  isLoggedAnyone () {
    return sessionStorage.getItem('jwt') ? true : false
  }

  getUserLang () {
    return localStorage.getItem('lang') || null
  }

  getUser () {
    if (this.isLoggedAnyone) {
      return {
        id: sessionStorage.getItem('id'),
        role: sessionStorage.getItem('role'),
        token: sessionStorage.getItem('jwt')
      }
    } else return undefined
  }
}
