import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Register } from '../models/register.model';
import { LoginUser } from '../models/loginUser.model';
import { Login } from '../models/login.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly baseApiUrl: string = environment.apiUrl + 'register/';

  private currentUserSource = new BehaviorSubject<Login | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  register(userInput: Register): Observable<Login> {
    return this.http.post<Login>(this.baseApiUrl + 'register', userInput).pipe(
      map(registerResponse => registerResponse)
    )
  }

  login(userInput: LoginUser): Observable<Login | null> {
    return this.http.post<Login>(this.baseApiUrl + 'login', userInput).pipe(
      map(loginResponse => {
        if (loginResponse) {
          this.setcurrentUser(loginResponse);

          this.router.navigateByUrl('/home');

          return loginResponse;
        }

        
        return null;
      })
    );
  }

  setcurrentUser(user: Login): void {
    this.currentUserSource.next(user);

    localStorage.setItem('user', JSON.stringify(user));

    // this.router.navigateByUrl('/home');
  }

  logout(): void{
    this.currentUserSource.next(null);

    localStorage.removeItem('user');
  }
}
