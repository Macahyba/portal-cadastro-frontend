import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CustomerModel } from '../model/customer.model';
import { catchError, timeout } from 'rxjs/operators';



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

  getAll(): Observable<CustomerModel> {
    return this._http.get<CustomerModel>('customers/');
  }

  post(customer: CustomerModel){
    const payload = JSON.stringify(<CustomerModel>customer);

    return this._http.post('customers/', payload, this.httpOptions).pipe(
      timeout(15000),
      catchError(this.handleError)
    );
  }

  patch(customer: CustomerModel){
    const payload = JSON.stringify(<CustomerModel>customer);
    const id = customer.id;

    return this._http.patch(`customers/${id}`, payload, this.httpOptions).pipe(
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
