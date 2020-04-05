import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { QuotationModel } from '../model/quotation.model';
import { CustomerModel } from '../model/customer.model';
import { EquipmentModel } from '../model/equipament.model';
import { ServiceModel } from '../model/service.model';
import { StatusModel } from '../model/status.model';
import { environment } from 'src/environments/environment';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})

export class QuotationService {

  HTTP_HOST : string = environment.api_host;

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

    getUsers(): Observable<UserModel>{
      return this._http.get<UserModel>('users/')
    }

    setQuotation(quotation: QuotationModel){
        const payload = JSON.stringify(<QuotationModel>quotation);

        return this._http.post('quotations/', payload, this.httpOptions).pipe(
          catchError(this.handleError)
        );
    }

    setService(service: ServiceModel){
      const payload = JSON.stringify(<ServiceModel>service);

      return this._http.post('equipments/', payload, this.httpOptions).pipe(
        catchError(this.handleError)
      );
    }

    setCustomer(customer: CustomerModel){
      const payload = JSON.stringify(<CustomerModel>customer);

      return this._http.post('customers/', payload, this.httpOptions).pipe(
        catchError(this.handleError)
      );
    }

    setEquipment(equipment: EquipmentModel){
      const payload = JSON.stringify(<EquipmentModel>equipment);

      return this._http.post('equipments/', payload, this.httpOptions).pipe(
        catchError(this.handleError)
      );
    }

    setUser(user: UserModel){
      const payload = JSON.stringify(<UserModel>user);

      return this._http.post('users/', payload, this.httpOptions).pipe(
        catchError(this.handleError)
      );
    }

    patchQuotation(quotation: QuotationModel){
      const payload = JSON.stringify(<QuotationModel>quotation);
      const id = quotation.id;

      return this._http.patch(`quotations/${id}`, payload, this.httpOptions).pipe(
        catchError(this.handleError)
      );
    }

    patchEquipment(equipment: EquipmentModel){
      console.log(equipment)
      const payload = JSON.stringify(<EquipmentModel>equipment);
      const id = equipment.id;

      return this._http.patch(`equipments/${id}`, payload, this.httpOptions).pipe(
        catchError(this.handleError)
      );
    }

    patchCustomer(customer: CustomerModel){
      const payload = JSON.stringify(<CustomerModel>customer);
      const id = customer.id;

      return this._http.patch(`customers/${id}`, payload, this.httpOptions).pipe(
        catchError(this.handleError)
      );
    }

    patchService(service : ServiceModel){
      const payload = JSON.stringify(<ServiceModel>service);
      const id = service.id;

      return this._http.patch(`services/${id}`, payload, this.httpOptions).pipe(
        catchError(this.handleError)
      );
    }

    patchUser(user : UserModel){
      const payload = JSON.stringify(<UserModel>user);
      const id = user.id;

      return this._http.patch(`users/${id}`, payload, this.httpOptions).pipe(
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
        return throwError(errorMessage);
     }
}
