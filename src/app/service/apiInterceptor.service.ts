import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

const HTTP_HOST = 'http://localhost:8080/api';
// const HTTP_HOST = 'ec2-13-58-84-178.us-east-2.compute.amazonaws.com:8080/api';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = sessionStorage.getItem('token');

    if (token) {

      const apiReq =
      req.clone({
        url: `${HTTP_HOST}/${req.url}`,
        setHeaders : {
          Authorization: sessionStorage.getItem('token')
        }
      });
      return next.handle(apiReq);

    } else {

      const apiReq =
      req.clone({
        url: `${HTTP_HOST}/${req.url}`
      });
      return next.handle(apiReq);
    }
  }
}
