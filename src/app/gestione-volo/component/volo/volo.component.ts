import { UserSessionService } from './../../../services/user-session.service';
import { Router } from '@angular/router';
import { VoloService, EventType } from './../../services/volo.service';
import { Volo } from './../../models/volo.class';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2'
import { PipesModule } from 'src/app/pipes/pipes.module';

@Component({
  selector: 'app-volo',
  templateUrl: './volo.component.html',
  styleUrls: ['./volo.component.scss']
})
export class VoloComponent implements OnInit {

  // PROPS
  @Input() volo: Volo;
  @Input() lastPrice: boolean = false;

  // PER FAR USCIRE DATI => EVENT EMITTER
  // @Output() prenotazioneVolo = new EventEmitter<Volo>();
  // @Output() voloCancellato = new EventEmitter<any>();

  constructor(
    public voloService: VoloService,
    public router: Router,
    public userSessionService: UserSessionService) {
  }

  ngOnInit(): void {
  }

  prenota(isPrenotato: boolean) {
    this.volo.prenotato = isPrenotato
    const that = this
    this.voloService.editVolo(this.volo, this.volo.id).subscribe(res => {
      if (res && res.id) {
        // this.prenotazioneVolo.emit(this.volo) // emit
        that.voloService.eventHub.next({type: EventType.REFRESH, data: {}}) //LANCIA UN EVENT
      }
    })
  }

  cancella() {
    if (this.userSessionService.getUser().role === 'admin' || this.userSessionService.getUser().role === 'operator') {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.voloService.removeVolo(this.volo.id).subscribe(res =>{
            if (res) {
              this.voloService.eventHub.next({type: EventType.REFRESH, data: {}}) //LANCIA UN EVENT
              Swal.fire(
                'Cancellazione',
                'Cancellazione eseguita correttamente',
                'success'
              );
            } else {
              Swal.fire(
                'Cancellazione',
                'Cancellazione NON eseguita correttamente',
                'error'
              );
            }
          }, (err) => {
            Swal.fire(
              'Cancellazione',
              'Cancellazione NON eseguita correttamente, errore: ' + err,
              'error'
            );
          });
        }

      })
    } else {
      Swal.fire(
        'Auth',
        'Ops! Non sei autorizzato ad accedere a questa risorsa.'
      )
    }
  }

  edit () {
    this.router.navigateByUrl('/edit-volo/' + this.volo.id)
  }

}
