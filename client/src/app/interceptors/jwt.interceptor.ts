import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../services/account.service';
import { take } from 'rxjs';
import { Login } from '../models/login.model';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  inject(AccountService).currentUser$.pipe(take(1)).subscribe({
    next: (cuurentUser: Login | null) => {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${cuurentUser?.token} `
        }
      });
    }
  });

  return next(req);
};
