import { Injectable } from '@angular/core';
import * as localForage from 'localforage';
import { Observable, from } from 'rxjs';
import { User } from '@core/models/user';
import { AuthToken } from '@core/models/auth-token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly keys = {
    authToken: 'auth-token',
    user: 'user'
  };

  constructor() {}

  public saveToken(token: AuthToken): Observable<any> {
    return from(localForage.setItem(this.keys.authToken, token));
  }

  public saveUser(user: User): Observable<any> {
    return from(localForage.setItem(this.keys.user, user));
  }

  public getToken(): Observable<AuthToken> {
    return from(localForage.getItem<AuthToken>(this.keys.authToken));
  }
  public removeToken() {
    localForage.removeItem(this.keys.authToken);
  }

  public getUser(): Observable<User> {
    return from(localForage.getItem<User>(this.keys.user));
  }
}
