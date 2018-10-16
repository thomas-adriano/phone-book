import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { tap, map, mergeMap } from 'rxjs/operators';
import { StorageService } from '@core/storage/storage.service';
import { LoginModel } from '@core/models/login';
import { Observable } from 'rxjs';
import { ContactModel } from '@core/models/contact';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private http: HttpClient, private storage: StorageService) {}

  public login(code: number): Observable<LoginModel> {
    return this.http
      .post<LoginModel>(`${environment.apiUrl}login`, { code })
      .pipe(
        tap(e => {
          this.storage.saveToken({ token: e.token });
          this.storage.saveUser(e.user);
        })
      );
  }

  public getContacts(): Observable<ContactModel[]> {
    return this.storage.getToken().pipe(
      mergeMap(token => {
        const headers = new HttpHeaders().set(
          'Authorization',
          `bearer ${token.token}`
        );
        return this.http.get<ContactModel[]>(`${environment.apiUrl}contacts`, {
          headers
        });
      })
    );
  }

  public getContactById(id: string): Observable<ContactModel> {
    return this.storage.getToken().pipe(
      mergeMap(token => {
        const headers = new HttpHeaders().set(
          'Authorization',
          `bearer ${token.token}`
        );
        const params = new HttpParams().set('id', id);
        return this.http.get<ContactModel>(`${environment.apiUrl}contacts`, {
          headers,
          params
        });
      })
    );
  }

  public updateContact(updatedContact: ContactModel): Observable<any> {
    return this.storage.getToken().pipe(
      mergeMap(token => {
        const headers = new HttpHeaders().set(
          'Authorization',
          `bearer ${token.token}`
        );
        return this.http.post<ContactModel>(
          `${environment.apiUrl}contact`,
          updatedContact,
          {
            headers
          }
        );
      })
    );
  }

  public createContact(contact: ContactModel): Observable<any> {
    console.log('creating contanct', contact);
    return this.storage.getToken().pipe(
      mergeMap(token => {
        const headers = new HttpHeaders().set(
          'Authorization',
          `bearer ${token.token}`
        );
        return this.http.put<ContactModel>(
          `${environment.apiUrl}contact`,
          contact,
          {
            headers
          }
        );
      })
    );
  }
}
