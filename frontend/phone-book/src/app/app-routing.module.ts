import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { ROUTES } from '@core/constants/routes';
import { AuthGuardService } from '@core/auth-guard/auth-guard.service';
import { StorageService } from '@core/storage/storage.service';

const routes: Routes = [
  {
    path: ROUTES.login,
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: ROUTES.contacts,
    loadChildren: './contacts/contacts.module#ContactsModule',
    canActivate: [AuthGuardService]
  },
  {
    path: ROUTES.addContact,
    loadChildren: './add-contact/add-contact.module#AddContactModule',
    canActivate: [AuthGuardService]
  },
  { path: '', redirectTo: `/${ROUTES.login}`, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule {}
