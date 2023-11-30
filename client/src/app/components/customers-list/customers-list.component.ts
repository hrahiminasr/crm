import { Component } from '@angular/core';
import { Customers } from 'src/app/models/customers.model';
import { Router } from '@angular/router';
import { CustomersListService } from 'src/app/services/customers-list.service';
import { CustomerUser } from 'src/app/models/customerUser.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent {
  allCustomer: CustomerUser[] | null | undefined;
  custom: Customers | undefined;
  allCustomer$: Observable<CustomerUser[] | null> | undefined;

  constructor(private customerListServices: CustomersListService, private router: Router) {
    customerListServices.getAllCustomer().subscribe({
      next: customerList => this.allCustomer = customerList,
      error: err => console.log(err)
    });

    this.allCustomer$ = customerListServices.getAllCustomer();
  }

  deleteCustomer(userMobilePhone: string) {
    this.customerListServices.deleteCustomer(userMobilePhone).subscribe({
      next: customerList => {
        this.allCustomer = customerList;
        alert("مشتری با موفقیت حدف شد");
        location.reload();
      }
    })
  }
}
