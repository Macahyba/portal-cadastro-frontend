import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { EquipmentModel } from '../model/equipament.model';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  HTTP_HOST : string = environment.api_host;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private _http: HttpClient){}

  getAll(): Observable<EquipmentModel> {
    return this._http.get<EquipmentModel>('equipments/');
  }

  post(equipment: EquipmentModel){
    const payload = JSON.stringify(<EquipmentModel>equipment);

    return this._http.post('equipments/', payload, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  patch(equipment: EquipmentModel){
    const payload = JSON.stringify(<EquipmentModel>equipment);
    const id = equipment.id;

    return this._http.patch(`equipments/${id}`, payload, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

}
