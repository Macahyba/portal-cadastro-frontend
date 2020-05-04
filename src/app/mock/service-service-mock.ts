import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ServiceModel } from '../model/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceServiceMock {

  getServices(): BehaviorSubject<ServiceModel[]> {

    const services = [
      new ServiceModel(1, "service1", "description1", 100),
      new ServiceModel(2, "service2", "description2", 200),
      new ServiceModel(3, "service3", "description3", 300),
      new ServiceModel(4, "service4", "description4", 400)
    ]

    return new BehaviorSubject<ServiceModel[]>(services);
  }

  getInjectedServices(): BehaviorSubject<ServiceModel[]> {

    const services = [
      new ServiceModel(2, "service2", "description2", 200),
      new ServiceModel(4, "service4", "description4", 400)
    ]

    return new BehaviorSubject<ServiceModel[]>(services);
  }


}
