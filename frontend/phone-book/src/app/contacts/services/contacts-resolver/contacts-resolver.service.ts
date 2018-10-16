import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BackendService } from '@core/backend/backend.service';
import { ContactModel } from '@core/models/contact';

@Injectable()
export class ContactsResolverService
  implements Resolve<Observable<ContactModel[]>> {
  constructor(private backend: BackendService) {}

  resolve() {
    return this.backend.getContacts();
  }
}
