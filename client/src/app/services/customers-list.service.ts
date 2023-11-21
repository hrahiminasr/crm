import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CustomerUser } from '../models/customerUser.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersListService {

  constructor(private http: HttpClient) {}

  getAllCustomer():Observable<CustomerUser[] | null>{
    return this.http.get<CustomerUser[]>('https://localhost:5001/api/customers/get-all').pipe(
      map((customersList: CustomerUser[]) => {
        if(customersList)
          return customersList;

        return null;
      })
    )
  }
}
