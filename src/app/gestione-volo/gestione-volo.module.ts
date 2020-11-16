import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoloComponent } from './component/volo/volo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewVoloComponent } from './component/new-volo/new-volo.component';
import { EditVoloComponent } from './component/edit-volo/edit-volo.component';
import { PipesModule } from '../pipes/pipes.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [VoloComponent, NewVoloComponent, EditVoloComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    FormsModule,
    PipesModule,
    HttpClientModule,
    TranslateModule
  ],
  exports: [VoloComponent, NewVoloComponent, EditVoloComponent]
})
export class GestioneVoloModule { }
