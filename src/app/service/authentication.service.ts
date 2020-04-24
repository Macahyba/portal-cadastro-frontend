import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, timeout, catchError } from 'rxjs/operators';
import * as decode from 'jwt-decode';
import { StorageService } from './storage.service';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _httpClient:HttpClient, private _stor: StorageService) { }

    authenticate(username, password) {

      return this._httpClient.post<any>('authenticate',{username,password}).pipe(
        timeout(15000),
        map(
          userData => {
            sessionStorage.setItem('username',username);
            let tokenStr= 'Bearer '+userData.token;
            sessionStorage.setItem('token', tokenStr);
            sessionStorage.setItem('role', this.getRole());
            this._stor.storageSub.next(this.getRole());
            return userData;
          }
        ),
        catchError(this.handleError)
      );
  }

  public isAuthenticated(): boolean {
    return sessionStorage.getItem('token') !=null && !this.isTokenExpired();
  }

  isTokenExpired(): boolean {
    return false;
  }

  public getId(): number {

    const token = sessionStorage.getItem('token');

    if (token){

      const tokenPayload: any = decode(token);

      return tokenPayload.jti;
    }
    return 0;
  }

  public getUsername(): string {

    const token = sessionStorage.getItem('token');

    if (token){

      const tokenPayload: any = decode(token);

      return tokenPayload.sub;
    }
    return '';
  }

  public getRole(): string {

    const token = sessionStorage.getItem('token');

    if (token){

      const tokenPayload: any = decode(token);

      return tokenPayload.iss;
    }
    return '';
  }

  logOut() {
    sessionStorage.clear();
    this._stor.storageSub.next(this.getRole());
  }

  handleError(error) {
    let errorMessage = '';

    if (error.name && error.name.includes("Timeout")){
      errorMessage = "Tempo de requisição excedido!";
    } else {
      errorMessage = "Não autorizado!";
    }
    return throwError(errorMessage);
  }

}
