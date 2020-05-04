import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceMock {

  authenticate(username , password): BehaviorSubject<any> {
    return new BehaviorSubject<any>(true);
  }

  getId(): number {
    return 1;
  }

  getRole(): string {
    return "admin";
  }

}
