import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  // PIPE, SIMILE AD UN MIXIN. ANGULAR OFFRE LE PIPE PER CAMBIARE IL VALORE DEGLI NG MODEL IN VISUALIZZAZIONE

  transform(value: string, args: number = 10): string {
    let res = value
    if (res && value.length > args) {
        res = value.substring(0, args) + '...'
    } else res = value
    return res;
  }

}
