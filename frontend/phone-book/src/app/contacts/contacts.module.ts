import { NgModule } from '@angular/core';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { SharedModule } from '@shared/shared.module';
import { MatListModule, MatDividerModule } from '@angular/material';
import { FilterByFirstLetterPipe } from './pipes/filter-by-first-letter.pipe';

@NgModule({
  imports: [
    SharedModule,
    ContactsRoutingModule,
    MatListModule,
    MatDividerModule
  ],
  declarations: [ContactsComponent, FilterByFirstLetterPipe]
})
export class ContactsModule {}
