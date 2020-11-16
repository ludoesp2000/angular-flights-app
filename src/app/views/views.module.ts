import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from './../directives/directives.module';
import { GestioneVoloModule } from './../gestione-volo/gestione-volo.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PrenotazioniComponent } from './components/prenotazioni/prenotazioni.component';
import { VoliComponent } from './components/voli/voli.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { TranslateModule } from '@ngx-translate/core';
import { AgGridModule } from 'ag-grid-angular';



@NgModule({
  declarations: [NavbarComponent, HomeComponent, AboutComponent, PrenotazioniComponent, VoliComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    GestioneVoloModule,
    FormsModule,
    DirectivesModule,
    TranslateModule,
    BsDropdownModule,
    AgGridModule
  ],
  exports: [NavbarComponent, HomeComponent, AboutComponent]
})
export class ViewsModule { }
