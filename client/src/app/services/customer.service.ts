import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Customers } from '../models/customers.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private currentCustomerSource = new BehaviorSubject<Customers | null>(null);
  currentCustomer$ = this.currentCustomerSource.asObservable();

  constructor(private http: HttpClient) { }

  postCustomer(customers: Customers): Observable<Customers | null> {

    return this.http.post<Customers>('https://localhost:5001/api/customers/customers', customers)
      .pipe(
        map(custom => {
          if (custom) {
            this.currentCustomerSource.next(custom);

            return custom;
          }

          return null;
        })
      );
  }

    getAllCustomer(){

      return this.http.get<Customers[]>('http://localhost:5000/api/customers/get-all');
    }
}
