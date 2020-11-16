import { LoadConfigService } from './services/load-config.service';
import { UserSessionService } from './services/user-session.service';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public loadConfig: LoadConfigService,
    public translate: TranslateService,
    public userSessionService: UserSessionService) {

    const lang = [ 'it', 'en', 'es', 'fr' ]

    translate.addLangs([
      'it',
      'en',
      'es',
      'fr'
    ])

    console.log('DYNAMIC INITIAL CONFIGURATION', this.loadConfig.getConfig())

    const browserLang = this.translate.getBrowserLang()
    const userLang = this.userSessionService.getUserLang()

    // GESTIONE LINGUA

    if (userLang) {
      translate.setDefaultLang(userLang)
      translate.use(userLang)
    } else if (lang.includes(browserLang)) {
      translate.setDefaultLang(browserLang)
      translate.use(browserLang)
    } else {
      const defaultLang = this.loadConfig.getConfig().defaultLang
      translate.setDefaultLang(defaultLang)
      translate.use(defaultLang)
    }

  }
}
