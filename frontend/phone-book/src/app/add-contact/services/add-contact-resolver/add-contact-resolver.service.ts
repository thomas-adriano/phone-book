import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, empty } from 'rxjs';
import { ContactModel } from '@core/models/contact';
import { BackendService } from '@core/backend/backend.service';

@Injectable()
export class AddContactResolverService
  implements Resolve<Observable<ContactModel>> {
  constructor(private backend: BackendService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const contactId = route.queryParams.contactId;
    if (!contactId) {
      return empty();
    }
    return this.backend.getContactById(contactId);
  }
}
