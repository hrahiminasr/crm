import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { CustomerUser } from '../models/customerUser.model';
import { AccountService } from './account.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CustomersListService {
  private http = inject(HttpClient);
  private accountServices = inject(AccountService);

  private readonly baseApiUrl: string = environment.apiUrl + 'customers/';

  getAllCustomer(): Observable<CustomerUser[] | null> {

    return this.http.get<CustomerUser[]>(this.baseApiUrl + 'get-all').pipe(
      map((customersList: CustomerUser[]) => {
        if (customersList)
          return customersList;

        return null;
      })
    )
  }

  deleteCustomer(userMobilePhone: string): Observable<CustomerUser[] | null> {

    return this.http.delete<CustomerUser[]>(this.baseApiUrl + 'delete/' + userMobilePhone).pipe(
      map((customerList: CustomerUser[]) => {
        return customerList;
      })
    )
  }
}
