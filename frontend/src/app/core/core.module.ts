import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpTokenInterceptor } from './interceptors';

import {
  ApiService,
  JwtService,
  UserService,
  TodoService,
  NoAuthGuard,
} from './services';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    JwtService,
    TodoService,
    UserService,
    NoAuthGuard
  ]
})
export class CoreModule { }
