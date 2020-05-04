import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDetailsModel } from '../model/user-details';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceMock {

  getUsersDetails(): BehaviorSubject<UserDetailsModel[]>{

    const user1 = new UserModel(1, "test user1", "test1@mail", "Boss", "99999999");
    const user2 = new UserModel(2, "test user2", "test2@mail", "User", "88888888");
    const userDetails = [
      new UserDetailsModel(1, "test", "admin", user1),
      new UserDetailsModel(2, "test2", "user", user2)
    ];

    return new BehaviorSubject<UserDetailsModel[]>(userDetails);
  }

  getOneUserDetails(id: number): BehaviorSubject<UserDetailsModel>{
    const user = new UserModel(1, "test user", "test@mail", "Boss", "99999999");
    const userDetails = new UserDetailsModel(1, "test", "admin", user);

    return new BehaviorSubject<UserDetailsModel>(userDetails);
  }



}
