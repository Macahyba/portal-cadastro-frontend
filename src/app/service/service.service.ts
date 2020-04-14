import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ServiceModel } from '../model/service.model';
import { catchError, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  HTTP_HOST : string = environment.api_host;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private _http: HttpClient){}

  getServices(): Observable<ServiceModel> {
    return this._http.get<ServiceModel>('services/');
  }

  postService(service: ServiceModel){
    const payload = JSON.stringify(<ServiceModel>service);

    return this._http.post('services/', payload, this.httpOptions).pipe(
      timeout(10000),
      catchError(this.handleError)
    );
  }

  patchService(service : ServiceModel){
    const payload = JSON.stringify(<ServiceModel>service);
    const id = service.id;

    return this._http.patch(`services/${id}`, payload, this.httpOptions).pipe(
      timeout(10000),
      catchError(this.handleError)
    );
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
