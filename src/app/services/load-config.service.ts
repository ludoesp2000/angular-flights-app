import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class LoadConfigService {

  // PER CARICARE CONFIGURAZIONI INIZIALI DELL'APP => vedi app-routing.module.ts

  private config: any

  constructor(private httpClient: HttpClient) { }

  load(): Promise<any> {
    return this.httpClient.get(environment.externalConfigPath).pipe(map(el => this.config = el)).toPromise()
  }

  getConfig () {
    return this.config
  }
}
