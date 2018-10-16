import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { StorageService } from '@core/storage/storage.service';
import { Observable, of } from 'rxjs';
import { ROUTES } from '@core/constants/routes';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private storage: StorageService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.storage.getToken().pipe(
      map(token => {
        if (!token) {
          this.router.navigate([ROUTES.login]);
          return false;
        }
        return true;
      })
    );
  }
}
