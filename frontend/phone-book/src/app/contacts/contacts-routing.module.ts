import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts.component';
import { ContactsResolverService } from './services/contacts-resolver/contacts-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ContactsComponent,
    resolve: { contacts: ContactsResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ContactsResolverService]
})
export class ContactsRoutingModule {}
