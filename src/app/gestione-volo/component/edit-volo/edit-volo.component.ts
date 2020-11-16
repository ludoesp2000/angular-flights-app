import { Router } from '@angular/router';
import { VoloService } from './../../services/volo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseVoloComponent } from '../base-volo-component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-volo',
  templateUrl: './edit-volo.component.html',
  styleUrls: ['./edit-volo.component.scss']
})
export class EditVoloComponent extends BaseVoloComponent implements OnInit {

  // REACTIVE FORM - PER FORM PIù COMPESSI E/O VALIDAZIONI COMPLESSE

  public formVolo: FormGroup;

  constructor(
    public actRoute: ActivatedRoute,
    public voloService: VoloService,
    public formBuilder: FormBuilder,
    public router: Router) {
      super(voloService);
      this.buildForm()
      this.formVolo.controls.partenza.valueChanges.subscribe(res => {
        this.setDestinazioni(res)
      })
  }

  ngOnInit(): void {
    const that = this
    this.actRoute.params.subscribe(params => {
      const id = +params.id // il + è come un parseInt
      this.voloService.getVoloById(id).subscribe(res => {
        if (res) {
          that.volo = res
          that.partenzaChanged(that.volo.partenza)
          that.setForm()
        }
      })
    })
  }

  // tramite custom validator si possono gestire le validazioni che offre form builder
  // Validators ha req max e min length e patterns per regex
  buildForm() {
    this.formVolo = this.formBuilder.group({
      partenza: ['', Validators.required],
      destinazione: ['', Validators.required],
      oraArrivo: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      oraPartenza: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      gate: ['', [Validators.required, Validators.maxLength(1), Validators.minLength(3)]],
      dataPartenza: ['', Validators.required],
      compagnia: ['', Validators.required],
      prezzo: ['', [Validators.required, Validators.maxLength(1), Validators.minLength(3)]]
    })
  }
  // senza il form builder
  // buildForm() {
  //   this.formVolo = new FormGroup({
  //     partenza: new FormControl('', Validators.required),
  //     destinazione: new FormControl('', Validators.required),
  //     oraArrivo: new FormControl('', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]),
  //     oraPartenza: new FormControl('', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]),
  //     gate: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.minLength(3)]),
  //     dataPartenza: new FormControl('', Validators.required),
  //     compagnia: new FormControl('', Validators.required),
  //     prezzo: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.minLength(3)])
  //   })
  // }

  setForm() {
    this.formVolo.patchValue({
      partenza: this.volo.partenza,
      destinazione: this.volo.destinazione,
      oraArrivo: this.volo.oraArrivo,
      oraPartenza: this.volo.oraPartenza,
      gate: this.volo.gate,
      dataPartenza: new Date(this.volo.dataPartenza),
      compagnia: this.volo.compagnia,
      prezzo: this.volo.prezzo
    })
  }

  // WATHCER PARTENZA
  partenzaChanged (val) {
    super.setDestinazioni(val)
  }

  reset () {
    this.formVolo.reset()
    this.setForm()
  }

  annulla() {
    this.router.navigateByUrl('/voli')
  }

  updateVolo () {
    const that = this
    if (!this.formVolo.valid) {
      // messaggio con gli errori
      let errKey = [];
      Object.keys(this.formVolo.controls).forEach((key, i) => {
        const err = that.formVolo.controls[key].errors;
        console.log(err);
        if (err) {
          errKey.push(key);
        }
      });
      Swal.fire('Ci sono dei campi non validi!')
    }
    this.volo.partenza = this.formVolo.controls.partenza.value
    this.volo.destinazione = this.formVolo.controls.destinazione.value
    this.volo.oraArrivo = this.formVolo.controls.oraArrivo.value
    this.volo.oraPartenza = this.formVolo.controls.oraPartenza.value
    this.volo.dataPartenza = this.formVolo.controls.dataPartenza.value
    this.volo.gate = this.formVolo.controls.gate.value
    this.volo.compagnia = this.formVolo.controls.compagnia.value

    this.voloService.editVolo(this.volo, this.volo.id).subscribe(res => {
      if (res) {
        that.router.navigateByUrl('/voli')

      }
    })
  }

}
