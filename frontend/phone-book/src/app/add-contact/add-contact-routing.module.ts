import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddContactComponent } from './add-contact.component';
import { AddContactResolverService } from './services/add-contact-resolver/add-contact-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: AddContactComponent,
    resolve: { contacts: AddContactResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AddContactResolverService]
})
export class AddContactRoutingModule {}
