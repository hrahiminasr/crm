import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { Customers } from 'src/app/models/customers.model';
import { CustomersComponent } from '../customers/customers.component';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent {
  customers: Customers[] | undefined;

  constructor(private http: HttpClient, private customerService: CustomerService) {
    // this.http.get<Customers[]>('http://localhost:5000/api/customers/get-all').subscribe(
    //   { next: response => this.customers = response }
    // );

  }

  customerService.getAllCustomer<Customers[]>().subscribe(
    next: res =>{
      this.customers = res;

    }
  );

  deleteCustomer(userMobilePhone:string){
    this.http.delete<Customers[]>('http://localhost:5000/api/customers/delete/'+userMobilePhone).subscribe(
      {next: res => {
        this.customers = res;
        }
      }
    );

  }
}
