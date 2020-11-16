import { Router } from '@angular/router';
import { VoloService } from './../../services/volo.service';
import { Component, OnInit } from '@angular/core';
import { Volo } from '../../models/volo.class';
import { BaseVoloComponent } from '../base-volo-component';

@Component({
  selector: 'app-new-volo',
  templateUrl: './new-volo.component.html',
  styleUrls: ['./new-volo.component.scss']
})
export class NewVoloComponent extends BaseVoloComponent implements OnInit {

  // TEMPLATE DRIVEN FORMS - PER FORM SEMPLICI

  constructor(public voloService: VoloService,
    public router: Router) {
      super(voloService)
  }

  ngOnInit(): void {
    this.partenze = this.voloService.partenze;
  }

  partenzaChanged (val) {
    super.setDestinazioni(val)
  }

  submitVolo() {
    this.voloService.addVolo(this.volo).subscribe(
      res => {},
      err => { console.log(err) },
      () => {
        this.router.navigateByUrl('voli')
      })
    this.volo = new Volo()
  }

}
