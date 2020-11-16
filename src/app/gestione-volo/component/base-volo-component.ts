import { Volo } from '../models/volo.class';
import { VoloService } from './../services/volo.service';

export class BaseVoloComponent {

  public volo: Volo = new Volo();
  public partenze = [];
  public lazyDestinazioni = [];

  constructor(public voloService: VoloService) {
    this.partenze = this.voloService.partenze;
  }

  setDestinazioni (val: string) {
    if (val) {
      const d = this.partenze.filter(el => {
        if (el.partenza === val) return el.destinazioni
      })
      this.lazyDestinazioni = d[0].destinazioni
    }
  }
}
