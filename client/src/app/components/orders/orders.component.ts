import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customers } from '../../models/customers.model';
import { Order } from '../../models/order.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatSelectModule
  ]
})
export class OrdersComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  ordersRes: Order | undefined;
  globError: string | undefined;
  public invoiceForm: FormGroup | any;
  todayDate: Date = new Date();
  customers: Customers[] | undefined;
  counter = 1;

  // constructor(private fb: FormBuilder, private http: HttpClient) {
  //   this.http.get<Customers[]>('http://localhost:5000/api/customers/get-all').subscribe(
  //     { next: response => this.customers = response }
  //   );
  // } ----> change to ngOnInit

  ngOnInit(): void {
    this.http.get<Customers[]>('http://localhost:5000/api/customers/get-all').subscribe(
      { next: response => this.customers = response }
    );
  }

  increment() {
    this.counter++;
  }

  // ngOnInit() {
  //   this.invoiceForm = this.fb.group({
  //     Rows: this.fb.array([this.initRows()])
  //   });
  // }

  //   get formArr() {
  //     return this.invoiceForm.get("Rows") as FormArray;
  //   }

  //   initRows() {
  //     return this.fb.group({
  //       name: [""]
  //     });
  //   }

  //   addNewRow() {
  //     this.formArr.push(this.initRows());
  //   }

  //   deleteRow(index: number) {
  //     this.formArr.removeAt(index);
  //   }


  ordersFg = this.fb.group({
    customerNamectrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    mobilePhoneCtrl: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    cityCtrl: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    dateCtrl: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    numberCtrl: ['', [Validators.required, Validators.min(1), Validators.max(1000)]],
    rowCtrl: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
    productCtrl: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    productNumbeCtrlr: ['', [Validators.required, Validators.min(1), Validators.max(1000)]],
    unitCtrl: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    descriptionCtrl: ['']
  });

  get CustomerNamectrl(): FormControl {
    return this.ordersFg.get('customerNamectrl') as FormControl;
  }
  get MobilePhoneCtrl(): FormControl {
    return this.ordersFg.get('mobilePhoneCtrl') as FormControl;
  }
  get CityCtrl(): FormControl {
    return this.ordersFg.get('cityCtrl') as FormControl;
  }
  get DateCtrl(): FormControl {
    return this.ordersFg.get('dateCtrl') as FormControl;
  }
  get NumberCtrl(): FormControl {
    return this.ordersFg.get('numberCtrl') as FormControl;
  }
  get RowCtrl(): FormControl {
    return this.ordersFg.get('rowCtrl') as FormControl;
  }
  get ProductCtrl(): FormControl {
    return this.ordersFg.get('productCtrl') as FormControl;
  }
  get ProductNumbeCtrlr(): FormControl {
    return this.ordersFg.get('productNumbeCtrlr') as FormControl;
  }
  get UnitCtrl(): FormControl {
    return this.ordersFg.get('unitCtrl') as FormControl;
  }
  get DescriptionCtrl(): FormControl {
    return this.ordersFg.get('descriptionCtrl') as FormControl;
  }

  orders(): void {
    let order: Order = {
      customerName: this.CustomerNamectrl.value,
      mobilePhone: this.MobilePhoneCtrl.value,
      city: this.CityCtrl.value,
      date: this.DateCtrl.value,
      number: this.NumberCtrl.value,
      row: this.RowCtrl.value,
      product: this.ProductCtrl.value,
      productNumber: this.ProductNumbeCtrlr.value,
      unit: this.UnitCtrl.value,
      description: this.DescriptionCtrl.value
    }

    this.http.post<Order>('http://localhost:5000/api/order/add-order/', order).subscribe(
      {
        next: res => {
          this.ordersRes = res;
          console.log(res);
        },
        error: err => {
          console.log(err.error);
          this.globError = err.error
        }
      }
    );
    // this.ordersFg.reset();
  }
}
