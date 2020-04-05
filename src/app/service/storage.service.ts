import { Injectable } from "@angular/core";
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storageSub = new Subject<string>();

  watchStorage(): Observable<any>{
    return this.storageSub.asObservable();
  }


}
