import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/register.model';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { RegisterById } from '../models/registerById';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private currentRegisterSource = new BehaviorSubject<RegisterById | null>(null);
  currentAdmin$ = this.currentRegisterSource.asObservable();

  constructor(private http: HttpClient) { }

  register(registerInput: Register): Observable<RegisterById | null> {
    return this.http.post<RegisterById>('https://localhost:5001/api/register/register', registerInput)
      .pipe(
        map(register => {
          if (register) {
            this.currentRegisterSource.next(register);

            return register
          }

          return null
        })
      )
  }
}
