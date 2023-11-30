import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Customers } from '../models/customers.model';
import { HttpClient } from '@angular/common/http';
import { CustomerUser } from '../models/customerUser.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private currentCustomerSource = new BehaviorSubject<CustomerUser | null>(null);
  currentCustomer$ = this.currentCustomerSource.asObservable();

  constructor(private http: HttpClient) { }

  postCustomer(customerInput: Customers): Observable<CustomerUser | null> {
    return this.http.post<CustomerUser>('http://localhost:5000/api/customers/customers', customerInput)
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
