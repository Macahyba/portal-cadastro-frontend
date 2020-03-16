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

    getServices(): Observable<ServiceModel> {
        return this._http.get<ServiceModel>('services/');
    }

    getCustomers(): Observable<CustomerModel> {
        return this._http.get<CustomerModel>('customers/');
    }

    getEquipments(): Observable<EquipmentModel> {
        return this._http.get<EquipmentModel>('equipments/');
    }

    setRepair(quotation: RepairModel){
      const payload = JSON.stringify(<RepairModel>quotation);

      return this._http.post('repairs/', payload, this.httpOptions).pipe(
        retry(1),
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
      console.log(errorMessage);
      return throwError(errorMessage);
  }

}
