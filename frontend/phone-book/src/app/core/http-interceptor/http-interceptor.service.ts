import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { ROUTES } from '@core/constants/routes';
import { StorageService } from '@core/storage/storage.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private storage: StorageService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.storage
      .getToken()
      .pipe(
        map(token => {
          if (req.url === environment.apiUrl + ROUTES.login) {
            return req;
          }

          return req.clone({
            setHeaders: {
              Authorization: `bearer ${token.token}`
            }
          });
        })
      )
      .pipe(mergeMap(mappedReq => next.handle(mappedReq)));
  }
}
