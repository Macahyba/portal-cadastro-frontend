import { Injectable } from '@angular/core';
import { StatusModel } from '../model/status.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusServiceMock {

  getStatus(): BehaviorSubject<StatusModel[]> {

    const statuses = [
      new StatusModel(1, "NOVO"),
      new StatusModel(2, "APROVADO")
    ]

    return new BehaviorSubject<StatusModel[]>(statuses);
  }

  getOneStatus(): BehaviorSubject<StatusModel> {

    const status = new StatusModel(1, "NOVO");

    return new BehaviorSubject<StatusModel>(status);
  }

}
