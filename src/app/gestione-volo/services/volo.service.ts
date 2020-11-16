import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable, ɵConsole } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Volo } from '../models/volo.class';

const API_URL = environment.apiUrl

// ENUM PER LANCIARE EVENTO, VEDI LOGIN COMPONENT (FAI LA LOGIN, LANCIA UN EVENTO PER FARE LA GET DEI VOLI)
export enum EventType {
  REFRESH,
  LOGIN,
  LOGOUT
}

@Injectable({
  providedIn: 'root'
})
export class VoloService {

  // this.voloService.eventHub.next({type: EventType.REFRESH, data: {}}) // PER LANCIARLO
  // this.voloService.eventHub.subscribe(res => { // PER RICEVERLO
  //   if (res && (res.type === EventType.REFRESH) {
  //     TODO
  //   }
  // }
  public eventHub = new Subject<{type: EventType, data: any}>()

  public partenze = [
    {
      partenza: 'ROMA',
      destinazioni: ['MILANO', 'BARI', 'PISA']
    },
    {
      partenza: 'MILANO',
      destinazioni: ['ROMA', 'CATANIA', 'PALERMO']
    },
    {
      partenza: 'VENEZIA',
      destinazioni: ['TORINO', 'FIRENZE', 'PISA']
    }
  ];

  constructor(private http: HttpClient) {
  }

  // !!!IMPORTANTE Rx.Observable.fromPromise(promise)
  // var Obs = Rx.Observable.fromPromise(this.http..... => http call che ritorna una promise, trasformata in Observable)
  // forma contratta
  // var Obs = from(array, mappa, oggetto, qualsiasi cosa), dovrebbe fare da solo l'import di from da rxjs

  getVoloList (filtered: boolean = false): Observable<Volo[]> {
    const resp = this.http.get<Volo[]>(API_URL + '/voli')
    return resp.pipe(map(elements => {
      if (filtered) return elements.filter(el => el.prenotato)
      else return elements
    }))
  }

  getVoloById (id: number): Observable<Volo> {
    return this.http.get<Volo>(API_URL + '/voli/' + id)
  }

  addVolo (volo: Volo): Observable<Volo> {
    return this.http.post<Volo>(API_URL + '/voli', volo)
  }

  editVolo (volo: Volo, id: number): Observable<Volo | any> {
    return this.http.put(API_URL + '/voli/' + id, volo)
  }

  removeVolo(pId: number): Observable<boolean> {
    return this.http.delete<boolean>(API_URL + '/voli/' + pId)
  }

}
