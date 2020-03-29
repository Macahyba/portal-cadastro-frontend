import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthenticationService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const role : String[] = route.data.role;

    const tokenRole = this.auth.getRole();

    if (this.auth.isAuthenticated() && role.includes(tokenRole)) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
