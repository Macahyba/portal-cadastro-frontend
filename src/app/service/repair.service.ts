import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class RepairService {
    
    constructor(private http: HttpClient){}
    
    getRepairs(){
        return this.http.get('http://127.0.0.1:8080/portalcadastro/repairs/');
    }

    getOneRepair(id: string){
        return this.http.get(`http://127.0.0.1:8080/portalcadastro/repairs/${id}`);
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

    getEquipments(){
        return this.http.get('http://127.0.0.1:8080/portalcadastro/equipments/');
    }
}