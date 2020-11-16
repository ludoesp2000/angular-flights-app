import { UserSessionService } from './../../../services/user-session.service';
import { EventType, VoloService } from './../../../gestione-volo/services/volo.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private subAdd: Subscription;
  private subRemove: Subscription;

  public numeroPrenotazioni: number = 0;

  constructor (
    public voloService: VoloService,
    public router: Router,
    public userSessionService: UserSessionService,
    public translate: TranslateService) {
  }

  ngOnInit() {
    if (this.userSessionService.isLoggedAnyone()) this.getAll()
    this.voloService.eventHub.subscribe(res => {
      if (res && (res.type === EventType.REFRESH || res.type === EventType.LOGIN)) {
        this.getAll()
      }
      if (res && res.type === EventType.LOGOUT) {
        this.numeroPrenotazioni = 0
      }
    })
  }

  ngOnDestroy(): void {
  }

  getAll() {
    this.voloService.getVoloList(true).subscribe(res => {
      this.numeroPrenotazioni = res.length
    })
  }

  navigate () {
    this.router.navigateByUrl('/login')
  }

  logout () {
    this.userSessionService.logout()
    this.voloService.eventHub.next({type: EventType.LOGOUT, data: {}})
    this.router.navigateByUrl('/home')
  }

  setLang (lang: string) {
    this.translate.setDefaultLang(lang)
    this.translate.use(lang)
    localStorage.setItem('lang', lang)
  }

  userCanManage (): boolean {
    const currentUser = this.userSessionService.getUser()
    return currentUser && currentUser.role === 'admin'
  }

}
