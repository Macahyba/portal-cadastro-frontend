import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AuthenticationService } from '../service/authentication.service';
import { StorageService } from '../service/storage.service';
import { LogoutComponent } from './logout.component';

fdescribe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let storageService;
  let router;

  const FAKE_ROLE = 'minhaRole';

  let serviceStub = {
    getRole() {
      return FAKE_ROLE;
    }
  } as AuthenticationService;
  let sessionStorageStub = {
    clear() {
      return true;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LogoutComponent
      ],
      imports: [ RouterTestingModule.withRoutes([]) ],
      providers: [
        StorageService,
        { provide: AuthenticationService, useValue: serviceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    spyOn(sessionStorage, 'clear');

    storageService = TestBed.get(StorageService);
    spyOn(storageService.storageSub, 'next');

    router = TestBed.get(Router);
    spyOn(router, 'navigateByUrl');

    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear the sessionStorage', () => {
    expect(sessionStorage.clear).toHaveBeenCalled();
  });

  it('should tell everybody that the user changed', () => {
    expect(storageService.storageSub.next).toHaveBeenCalledWith(FAKE_ROLE);
  });

  it('should navigate to the login page', () => {
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
