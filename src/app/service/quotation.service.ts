import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, timeout } from 'rxjs/operators';
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

  getAll(): Observable<QuotationModel[]> {
      return this._http.get<QuotationModel[]>('quotations/');
  }

  get(id: number): Observable<QuotationModel> {
      return this._http.get<QuotationModel>(`quotations/${id}`);
  }

  post(quotation: QuotationModel){
      const payload = JSON.stringify(<QuotationModel>quotation);

      return this._http.post('quotations/', payload, this.httpOptions).pipe(
        timeout(15000),
        catchError(this.handleError)
      );
  }

  patch(quotation: QuotationModel){
    const payload = JSON.stringify(<QuotationModel>quotation);
    const id = quotation.id;

    return this._http.patch(`quotations/${id}`, payload, this.httpOptions).pipe(
      timeout(15000),
      catchError(this.handleError)
    );
  }

  downloadPdf(id: number, label: string){
    this._http.get(`pdf/${id}`, {responseType: 'blob'})
    .subscribe(response => this.downLoadFile(response, "application/pdf", `${label}.pdf`));
  }

  downloadCsv(){
    this._http.get(`quotations-csv`, {responseType: 'blob'})
    .subscribe(response => this.downLoadFile(response, "application/ms-excel", "quotations.csv"));
  }

  downLoadFile(data: any, type: string, filename: string) {
    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob);
    let anchor = document.createElement("a");
    anchor.download = filename;
    anchor.href = url;
    anchor.click();
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
