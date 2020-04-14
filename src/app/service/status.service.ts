import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { StatusModel } from '../model/status.model';

@Injectable({
  providedIn: 'root'
})

export class StatusService {

  HTTP_HOST : string = environment.api_host;

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    constructor(private _http: HttpClient){}

    getStatus(): Observable<StatusModel>{
      return this._http.get<StatusModel>('status/')
    }

    handleError(error) {
      let errorMessage = '';

      if (error.name && error.name.includes("Timeout")){
        errorMessage = "Tempo de requisição excedido!";
      } else {
        errorMessage = "Falha ao salvar!";
      }
      return throwError(errorMessage);
    }

  }
