import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { QuotationModel } from '../model/quotation.model';
import { CustomerModel } from '../model/customer.model';
import { EquipmentModel } from '../model/equipament.model';
import { ServiceModel } from '../model/service.model';
import { StatusModel } from '../model/status.model';

@Injectable({
    providedIn: 'root'
    })

export class QuotationService {

    HTTP_HOST : string = 'http://localhost:8080/portalcadastro';

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    constructor(private _http: HttpClient){}

    getQuotations(): Observable<QuotationModel[]> {
        return this._http.get<QuotationModel[]>('quotations/');
    }

    getOneQuotation(id: string): Observable<QuotationModel> {
        return this._http.get<QuotationModel>(`quotations/${id}`);
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

    getStatus(): Observable<StatusModel>{
        return this._http.get<StatusModel>('status/')
    }

    setQuotation(quotation: QuotationModel){
        const payload = JSON.stringify(<QuotationModel>quotation);

        return this._http.post('quotations/', payload, this.httpOptions).pipe(
          retry(1),
          catchError(this.handleError)
        );
    }

    patchQuotation(quotation: QuotationModel){
      const payload = JSON.stringify(<QuotationModel>quotation);
      const id = quotation.id;

      return this._http.patch(`quotations/${id}`, payload, this.httpOptions).pipe(
        retry(1),
        catchError(this.handleError)
      );
    }

    downloadPdf(id: string){
      window.open(`${this.HTTP_HOST}/pdf/${id}`);
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
