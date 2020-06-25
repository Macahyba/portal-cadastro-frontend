import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HeaderComponent', () => {

  describe('given the HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let el: HTMLElement;


    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ HeaderComponent ],
        imports: [
          MatMenuModule,
          MatIconModule,
          MatButtonModule,
          RouterTestingModule,
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('given the HeaderComponent is NOT logged', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let el: HTMLElement;
    let menu: NodeList;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ HeaderComponent ],
        imports: [
          MatMenuModule,
          MatIconModule,
          MatButtonModule,
          RouterTestingModule,
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      el = fixture.debugElement.nativeElement;
    });

    it('should NOT show buttons', () => {
      fixture.detectChanges();
      menu = el.querySelectorAll("button");
      expect(menu.length).toEqual(0);
    });
  });

  describe('given the HeaderComponent IS logged', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let el: HTMLElement;
    let menu: NodeList;
    let elAfterClick: HTMLElement;
    let cstBtn: HTMLElement;
    let usrBtn: HTMLElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ HeaderComponent ],
        imports: [
          MatMenuModule,
          MatIconModule,
          MatButtonModule,
          RouterTestingModule,
          MatToolbarModule,
          BrowserAnimationsModule
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      component.role = "any";

      el = fixture.debugElement.nativeElement.parentNode;
      fixture.detectChanges();
    });

    it('should show buttons', () => {
      menu = el.querySelectorAll("button");
      expect(menu.length).not.toEqual(0);
    });

    it('should show /orcamentos', () => {
      expect(el.querySelector('#orcamentos')).not.toBeNull();
    });

    it('should show /reparos', () => {
      expect(el.querySelector('#reparos')).not.toBeNull();
    });

    it('should show the Clientes menu', () => {
      fixture.detectChanges();
      cstBtn = el.querySelector("#customMenu");
      fixture.detectChanges();
      cstBtn.click();
      elAfterClick = fixture.nativeElement.parentNode;
      fixture.whenStable();
      expect(elAfterClick.querySelector('#clientes')).not.toBeNull();
    });

    it('should show Equipamentos menu', () => {
      fixture.detectChanges();
      cstBtn = el.querySelector("#customMenu");
      fixture.detectChanges();
      cstBtn.click();
      elAfterClick = fixture.nativeElement.parentNode;
      fixture.whenStable();
      expect(elAfterClick.querySelector('#equipamentos')).not.toBeNull();
    });

    it('should show Servicos menu', () => {
      fixture.detectChanges();
      cstBtn = el.querySelector("#customMenu");
      fixture.detectChanges();
      cstBtn.click();
      elAfterClick = fixture.nativeElement.parentNode;
      fixture.whenStable();
      expect(elAfterClick.querySelector('#servicos')).not.toBeNull();
    });

    it('should show Perfil menu', () => {
      fixture.detectChanges();
      usrBtn = el.querySelector("#userMenu");
      fixture.detectChanges();
      usrBtn.click();
      elAfterClick = fixture.nativeElement.parentNode;
      fixture.whenStable();
      expect(elAfterClick.querySelector('#perfil')).not.toBeNull();
    });

    it('should show /logout', () => {
      fixture.detectChanges();
      usrBtn = el.querySelector("#userMenu");
      fixture.detectChanges();
      usrBtn.click();
      elAfterClick = fixture.nativeElement.parentNode;
      fixture.whenStable();
      expect(elAfterClick.querySelector('#logout')).not.toBeNull();
    });

    it('should NOT show Usuarios menu', () => {
      fixture.detectChanges();
      usrBtn = el.querySelector("#userMenu");
      fixture.detectChanges();
      usrBtn.click();
      elAfterClick = fixture.nativeElement.parentNode;
      fixture.whenStable();
      expect(elAfterClick.querySelector('#usuarios')).toBeNull();
    });

  });

  describe('given the HeaderComponent has role = admin', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let el: HTMLElement;
    let elAfterClick: HTMLElement;
    let usrBtn: HTMLElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ HeaderComponent ],
        imports: [
          MatMenuModule,
          MatIconModule,
          MatButtonModule,
          RouterTestingModule,
          MatToolbarModule,
          BrowserAnimationsModule
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      component.role = 'admin';

      el = fixture.debugElement.nativeElement.parentNode;
      fixture.detectChanges();
    });

    it('should show the Usuarios menu', (() => {
      usrBtn = el.querySelector("#userMenu");
      fixture.detectChanges();
      usrBtn.click();

      elAfterClick = fixture.nativeElement.parentNode;
      fixture.whenStable();
      expect((elAfterClick.querySelector('#usuarios'))).not.toBeNull();

    }));
  });
});
