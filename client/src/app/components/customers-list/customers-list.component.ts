import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerUser } from '../../models/customerUser.model';
import { Customers } from '../../models/customers.model';
import { CustomersListService } from '../../services/customers-list.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
  imports: [
    CommonModule, RouterModule, MatFormFieldModule,
    MatInputModule, MatIconModule
  ]
})
export class CustomersListComponent implements OnInit {
  private customerListServices = inject(CustomersListService);
  private router = inject(Router);

  allCustomer: CustomerUser[] | null | undefined;
  custom: Customers | undefined;
  allCustomer$: Observable<CustomerUser[] | null> | undefined;

  ngOnInit(): void {
    this.customerListServices.getAllCustomer().subscribe({
      next: customerList => this.allCustomer = customerList,
      error: err => console.log(err)
    });

    this.allCustomer$ = this.customerListServices.getAllCustomer();
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
