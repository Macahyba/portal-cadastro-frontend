import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError, timeout } from 'rxjs/operators';
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

    getOneRepair(id: number): Observable<RepairModel> {
        return this._http.get<RepairModel>(`repairs/${id}`);
    }

    postRepair(repair: RepairModel){
      const payload = JSON.stringify(<RepairModel>repair);

      return this._http.post('repairs/', payload, this.httpOptions).pipe(
        timeout(15000),
        catchError(this.handleError)
      );
    }

    patchRepair(repair: RepairModel){
      const payload = JSON.stringify(<RepairModel>repair);
      const id = repair.id;

      return this._http.patch(`repairs/${id}`, payload, this.httpOptions).pipe(
        timeout(15000),
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
