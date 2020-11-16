import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { EventType, VoloService } from './../../../gestione-volo/services/volo.service';
import { Component, OnInit } from '@angular/core';
import { Volo } from 'src/app/gestione-volo/models/volo.class';

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  styleUrls: ['./prenotazioni.component.scss']
})
export class PrenotazioniComponent implements OnInit {

  public voloList: Array<Volo>

  constructor(public voloService: VoloService, public router: Router) { }

  ngOnInit(): void {
    this.getAll()
    this.voloService.eventHub.subscribe(res => {
      if (res && (res.type === EventType.REFRESH || res.type === EventType.LOGIN)) {
        this.getAll()
      }
    })
  }

  async getAll() {
    await this.voloService.getVoloList(true).subscribe(res => {
      this.voloList = res
      if (this.voloList.length === 0) {
        Swal.fire('Non ci sono voli last prices!').then(res => {
          if (res.isConfirmed) {
            this.router.navigateByUrl('/voli')
          }
        })
      }
    })
  }

}
