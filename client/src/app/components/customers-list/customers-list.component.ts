import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Customers } from 'src/app/models/customers.model';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent {
  customers: Customers[] | undefined;
  value = 'Clear me'
  constructor(private http: HttpClient) {
    this.http.get<Customers[]>('http://localhost:5000/api/customers/get-all').subscribe(
      { next: response => this.customers = response }
    );
  }
}


