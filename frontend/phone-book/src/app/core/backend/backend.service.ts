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
    return this.http.get<ContactModel[]>(`${environment.apiUrl}contacts`);
  }

  public getContactById(id: string): Observable<ContactModel> {
    const params = new HttpParams().set('id', id);
    return this.http.get<ContactModel>(`${environment.apiUrl}contacts`, {
      params
    });
  }

  public deleteContact(contactId: string): Observable<any> {
    const params = new HttpParams().set('id', contactId);
    return this.http.delete<ContactModel>(`${environment.apiUrl}contact`, {
      params
    });
  }

  public updateContact(updatedContact: ContactModel): Observable<any> {
    return this.http.post<ContactModel>(
      `${environment.apiUrl}contact`,
      updatedContact
    );
  }

  public createContact(contact: ContactModel): Observable<any> {
    return this.http.put<ContactModel>(`${environment.apiUrl}contact`, contact);
  }
}
