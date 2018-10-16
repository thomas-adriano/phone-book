import { TestBed } from '@angular/core/testing';

import { AddContactResolverService } from './add-contact-resolver.service';

describe('AddContactResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddContactResolverService = TestBed.get(AddContactResolverService);
    expect(service).toBeTruthy();
  });
});
