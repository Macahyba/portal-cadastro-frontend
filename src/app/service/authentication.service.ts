import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as decode from 'jwt-decode';

export class User {
  constructor(public status:string) { }
}

export class JwtResponse {
  constructor(public jwttoken:string) { }
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private httpClient:HttpClient) { }

    authenticate(username, password) {

      return this.httpClient.post<any>('authenticate',{username,password}).pipe(
        map(
          userData => {
            sessionStorage.setItem('username',username);
            let tokenStr= 'Bearer '+userData.token;
            sessionStorage.setItem('token', tokenStr);
            return userData;
          }
        )
      );
  }

  public isAuthenticated(): boolean {
    return sessionStorage.getItem('token') !=null && !this.isTokenExpired();
  }

  isTokenExpired(): boolean {
    return false;
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
  }

}
