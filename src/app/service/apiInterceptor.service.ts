import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

const HTTP_HOST : string = environment.api_host;

@Injectable()
export class APIInterceptor implements HttpInterceptor {

  apiReq: HttpRequest<any>;

  constructor(private _router: Router){ }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = sessionStorage.getItem('token');

    if (token) {

      this.apiReq =
      req.clone({
        url: `${HTTP_HOST}/${req.url}`,
        setHeaders : {
          Authorization: sessionStorage.getItem('token')
        }
      });

    } else {

      this.apiReq =
      req.clone({
        url: `${HTTP_HOST}/${req.url}`
      });
    }

    return next.handle(this.apiReq).pipe( tap(() => {},
    (err: any) => {
      if (err instanceof HttpErrorResponse) {
        const path = this._router.url.replace(/(\w+)(\/)(\w+)/, '$1')
        if (err.status == 401 && !this.apiReq.url.includes("authenticate")) this._router.navigate(['logout']);
        if (err.status == 404) this._router.navigate([path]);
        return;
      }
    }))
  }
}
