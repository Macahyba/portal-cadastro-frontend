import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { RepairModel } from '../model/repair.model';
import { ServiceModel } from '../model/service.model';
import { CustomerModel } from '../model/customer.model';
import { EquipmentModel } from '../model/equipament.model';

@Injectable({
  providedIn: 'root'
})

export class RepairService {


    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    constructor(private _http: HttpClient){}

    getRepairs(): Observable<RepairModel[]> {
        return this._http.get<RepairModel[]>('repairs/');
    }

    getOneRepair(id: string): Observable<RepairModel> {
        return this._http.get<RepairModel>(`repairs/${id}`);
    }

    postRepair(repair: RepairModel){
      const payload = JSON.stringify(<RepairModel>repair);

      return this._http.post('repairs/', payload, this.httpOptions).pipe(
        catchError(this.handleError)
      );
    }

    patchRepair(repair: RepairModel){
      const payload = JSON.stringify(<RepairModel>repair);
      const id = repair.id;

      return this._http.patch(`repairs/${id}`, payload, this.httpOptions).pipe(
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
