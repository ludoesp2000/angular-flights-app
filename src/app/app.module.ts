import { ProxyInterceptorService } from './services/proxy-interceptor.service';
import { environment } from './../environments/environment.prod';
import { VoloService } from './gestione-volo/services/volo.service';
import { GestioneVoloModule } from './gestione-volo/gestione-volo.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ViewsModule } from "./views/views.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoadConfigService } from './services/load-config.service';
import { AgGridModule } from 'ag-grid-angular';


const API_URL = environment.apiUrl // IL FILE ENVIRONMENT VERRà SOSTITUITO CON environment.prod SE IL SITO VIENE LANGIATO CON ng serve --prod

// npm install @ngx-translate/core --save per internazionalizzazione sito

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function initConfig(config: LoadConfigService) {
  return () => config.load()
}


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ViewsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(), // inizializzato dove serve, se serve (?)
    AgGridModule.withComponents([]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    GestioneVoloModule,
    HttpClientModule // [!] ho dovuto cancellare i node modules e fare npm i per importarlo, dava errore all'inizio
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ProxyInterceptorService, multi: true},
    LoadConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [LoadConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

