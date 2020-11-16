import { VoloService, EventType } from './../../../gestione-volo/services/volo.service';
import { Volo } from './../../../gestione-volo/models/volo.class';
import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-voli',
  templateUrl: './voli.component.html',
  styleUrls: ['./voli.component.scss']
})
export class VoliComponent implements OnInit {

  public voloList: Array<Volo>

  constructor(public voloService: VoloService) {
  }

  ngOnInit(): void {
    this.getAll()
    this.voloService.eventHub.subscribe(res => {
      if (res && res.type === EventType.REFRESH) {
        this.getAll()
      }
    })
  }

  getAll() {
    this.voloService.getVoloList().subscribe(res => {
      this.voloList = res
    },
    err => { console.log(err) })
  }

  voloPrenotato(volo: Volo) { // emitter che non viene più usato, lasciato solo per demo
    console.log(volo, 'prenotazione effettuata')
  }

}
