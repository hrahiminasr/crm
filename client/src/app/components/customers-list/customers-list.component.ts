import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { Customers } from 'src/app/models/customers.model';
import { CustomersComponent } from '../customers/customers.component';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';
import { CustomersListService } from 'src/app/services/customers-list.service';
import { CustomerUser } from 'src/app/models/customerUser.model';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent {
  customersList: CustomerUser[] | null | undefined;
  custom: Customers | undefined;

  constructor(private customerListServices: CustomersListService, private http: HttpClient, private router: Router) {
    // this.http.get<Customers[]>('http://localhost:5000/api/customers/get-all').subscribe(
    //   { next: response => this.customers = response }
    // );
    customerListServices.getAllCustomer().subscribe({
      next: customerList => this.customersList = customerList,
      error: err => console.log(err)
    });
  }

  deleteCustomer(userMobilePhone:string){
    this.http.delete<CustomerUser[]>('https://localhost:5001/api/customers/delete/'+userMobilePhone).subscribe(
      {next: res => {
        this.customersList = res;
        alert("مشتری با موفقیت حدف شد");
        location.reload();
        }
      }
    );
  }
}
