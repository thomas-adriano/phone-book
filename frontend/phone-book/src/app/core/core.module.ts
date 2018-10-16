import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher
} from '@angular/material/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './http-interceptor/http-interceptor.service';
import { StorageService } from './storage/storage.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      deps: [StorageService],
      multi: true
    }
  ]
})
export class CoreModule {}
