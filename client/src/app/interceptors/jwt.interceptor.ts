import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from '../services/account.service';
import { Login } from '../models/login.model';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountServices: AccountService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.accountServices.currentUser$.pipe(take(1)).subscribe({
      next: (cuurentUser: Login | null) => {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${cuurentUser?.token} `
          }
        });
      }
    });
    return next.handle(request);
  }
}
