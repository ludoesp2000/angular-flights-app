export class Volo {
  public id: number;
  public partenza: string;
  public destinazione: string;
  public oraArrivo: string;
  public oraPartenza: string;
  public gate: number;
  public dataPartenza: Date;
  public compagnia: string;
  public prezzo: number;
  public prenotato?: boolean = false;
}
