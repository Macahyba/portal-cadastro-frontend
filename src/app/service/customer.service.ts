import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CustomerModel } from '../model/customer.model';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  HTTP_HOST : string = environment.api_host;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private _http: HttpClient){}

  getCustomers(): Observable<CustomerModel> {
    return this._http.get<CustomerModel>('customers/');
  }

  postCustomer(customer: CustomerModel){
    const payload = JSON.stringify(<CustomerModel>customer);

    return this._http.post('customers/', payload, this.httpOptions).pipe(
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
