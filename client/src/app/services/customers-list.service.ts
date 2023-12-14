import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { CustomerUser } from '../models/customerUser.model';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersListService {
  private http = inject(HttpClient);
  private accountServices = inject(AccountService);

  getAllCustomer(): Observable<CustomerUser[] | null> {

    return this.http.get<CustomerUser[]>('http://localhost:5000/api/customers/get-all').pipe(
      map((customersList: CustomerUser[]) => {
        if (customersList)
          return customersList;

        return null;
      })
    )
  }

  deleteCustomer(userMobilePhone: string): Observable<CustomerUser[] | null> {

    return this.http.delete<CustomerUser[]>('http://localhost:5000/api/customers/delete/' + userMobilePhone).pipe(
      map((customerList: CustomerUser[]) => {
        return customerList;
      })
    )
  }
}
