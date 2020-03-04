import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class QuotationService {
    
    constructor(private http: HttpClient){}
    
    getQuotations(){
        return this.http.get('http://127.0.0.1:8080/portalcadastro/quotations/');
    }

    getOneQuotation(id: string){
        return this.http.get(`http://127.0.0.1:8080/portalcadastro/quotations/${id}`);
    }

    getServices(){
        return this.http.get('http://127.0.0.1:8080/portalcadastro/services/');
    }

    getCustomers(){
        return this.http.get('http://127.0.0.1:8080/portalcadastro/customers/');
    }
}