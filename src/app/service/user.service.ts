import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserModel } from '../model/user.model';
import { catchError, timeout } from 'rxjs/operators';
import { UserDetailsModel } from '../model/user-details';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  HTTP_HOST : string = environment.api_host;

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    constructor(private _http: HttpClient){}

    getUsers(): Observable<UserModel>{
      return this._http.get<UserModel>('users/')
    }

    getUsersDetails(): Observable<UserDetailsModel>{
      return this._http.get<UserDetailsModel>('usersdetails/')
    }

    getOneUserDetails(id: number): Observable<UserDetailsModel>{
      return this._http.get<UserDetailsModel>(`usersdetails/${id}`);
    }

    postUser(user: UserModel){
      const payload = JSON.stringify(<UserModel>user);

      return this._http.post('users/', payload, this.httpOptions).pipe(
        timeout(10000),
        catchError(this.handleError)
      );
    }

    postUserDetails(user: UserDetailsModel){
      const payload = JSON.stringify(<UserDetailsModel>user);

      return this._http.post('usersdetails/', payload, this.httpOptions).pipe(
        timeout(10000),
        catchError(this.handleError)
      );
    }

    patchUser(user : UserModel){
      const payload = JSON.stringify(<UserModel>user);
      const id = user.id;

      return this._http.patch(`users/${id}`, payload, this.httpOptions).pipe(
        timeout(10000),
        catchError(this.handleError)
      );
    }

    patchUserDetails(user : UserDetailsModel){
      const payload = JSON.stringify(<UserModel>user);
      const id = user.id;

      return this._http.patch(`usersdetails/${id}`, payload, this.httpOptions).pipe(
        timeout(10000),
        catchError(this.handleError)
      );
    }

    resetUser(user: UserDetailsModel){
      const payload = JSON.stringify(<UserModel>user);
      const id = user.id;

      return this._http.patch(`reset/${id}`, payload, this.httpOptions).pipe(
        timeout(10000),
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
