import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../models/loginUser.model';
import { Login } from '../models/login.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(userInput: LoginUser): Observable<Login> {
    return this.http.post<Login>('https://localhost:5001/api/register/login', userInput).pipe(
      map(login => login)
    );
  }
}
