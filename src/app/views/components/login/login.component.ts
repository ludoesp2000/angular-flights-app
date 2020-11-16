import { User } from './../../models/user.class';
import { EventType, VoloService } from './../../../gestione-volo/services/volo.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { UserSessionService } from './../../../services/user-session.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username: string
  public password: string
  public role: string

  public roles;

  private userFields = new User();

  constructor(
    public userSessionService: UserSessionService,
    public actRoute: ActivatedRoute,
    public router: Router,
    public voloService: VoloService) {
      if (this.newUserRoute()) this.roles = this.userSessionService.getRoles()
    }

  ngOnInit(): void {
  }

  newUserRoute () {
    return this.actRoute.snapshot.routeConfig.path === 'new-user'
  }

  login () {
    this.userFields.id = this.username,
    this.userFields.password = this.password
    let dbUser: User
    let canLog: boolean
    this.userSessionService.getUserById(this.userFields).subscribe(
      res => {
        dbUser = res
        canLog = this.userFields.password === dbUser.password

      },
      err => {
        this.loginError()
      },
      () => {
        if (canLog) {
          Swal.fire('Login effettuato!').then(res => {
            if (res.isConfirmed) {
              this.userSessionService.saveUserData(dbUser)
              this.router.navigateByUrl('/voli')
              this.voloService.eventHub.next({type: EventType.LOGIN, data: {}})
            }
          })
        } else {
          this.loginError()
        }
      }
    )
  }

  signIn () {
    this.userFields.id = this.username
    this.userFields.password = this.password
    this.userFields.role = this.role
    this.userFields.token = this.role
    this.userSessionService.signIn(this.userFields).subscribe(
      res => {},
      err => {
        this.signinError()
      },
      () => {
        Swal.fire('Account creato!').then(res => {
          if (res.isConfirmed) {
            this.cleanSignin()
          }
        })
      }
    )
  }

  loginError () {
    Swal.fire('Credenziali non valide!')
    this.cleanLogin()
  }

  cleanLogin () {
    this.username = ''
    this.password = ''
    this.userFields.id = ''
    this.userFields.password = ''
  }

  signinError () {
    Swal.fire('Errore durante il salvataggio!')
    this.cleanSignin()
  }

  cleanSignin () {
    this.username = ''
    this.password = ''
    this.role = ''
    this.userFields.id = ''
    this.userFields.password = ''
    this.userFields.role = ''
    this.userFields.token = ''
  }

}
