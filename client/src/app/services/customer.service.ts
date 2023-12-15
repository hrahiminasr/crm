import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Customers } from '../models/customers.model';
import { HttpClient } from '@angular/common/http';
import { CustomerUser } from '../models/customerUser.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private http = inject(HttpClient);

  private readonly baseApiUrl: string = environment.apiUrl + 'customers/';

  private currentCustomerSource = new BehaviorSubject<CustomerUser | null>(null);
  currentCustomer$ = this.currentCustomerSource.asObservable();

  postCustomer(customerInput: Customers): Observable<CustomerUser | null> {
    return this.http.post<CustomerUser>(this.baseApiUrl + 'customers', customerInput)
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

  getAllCustomer() {

    return this.http.get<Customers[]>(this.baseApiUrl + 'get-all');
  }
}
