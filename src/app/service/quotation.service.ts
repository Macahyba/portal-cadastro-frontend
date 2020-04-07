import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { QuotationModel } from '../model/quotation.model';
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

    postQuotation(quotation: QuotationModel){
        const payload = JSON.stringify(<QuotationModel>quotation);

        return this._http.post('quotations/', payload, this.httpOptions).pipe(
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
