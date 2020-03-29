import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private _auth: AuthenticationService, private _router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this._auth.isAuthenticated()) {
      this._router.navigate(['login']);
      return false;
    }

    return true;
  }
}
