import { NgModule } from '@angular/core';

import { AddContactRoutingModule } from './add-contact-routing.module';
import { AddContactComponent } from './add-contact.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [SharedModule, AddContactRoutingModule],
  declarations: [AddContactComponent]
})
export class AddContactModule {}
