import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/register.model';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { LoginUser } from '../models/loginUser.model';
import { RegisterUser } from '../models/registerUser.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private currentRegisterSource = new BehaviorSubject<RegisterUser | null>(null);
  currentAdmin$ = this.currentRegisterSource.asObservable();

  constructor(private http: HttpClient) { }

  register(userInput: Register): Observable<RegisterUser | null> {
    return this.http.post<RegisterUser>('https://localhost:5001/api/register/register', userInput).pipe(
      map(register => register)
    )
  }
}
