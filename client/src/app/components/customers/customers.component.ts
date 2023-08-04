import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Customers } from 'src/app/models/customers.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {
  customerRes: Customers | undefined;
  globError : string | undefined;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  customerFg = this.fb.group({
    nameCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    nationallCodeCtrl: [''],
    economicCodeCtrl: [''],
    mobilePhoneCtrl: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    phoneNumberCtrl: [''],
    stateCtrl: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(30)]],
    cityCtrl: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    addressCtrl: [''],
    factoryAddressCtrl: [''],
    zipeCodeCtrl: ['']
  });

  get NameCtrl(): FormControl {
    return this.customerFg.get('nameCtrl') as FormControl;
  }
  get NationallCodeCtrl(): FormControl {
    return this.customerFg.get('nationallCodeCtrl') as FormControl;
  }
  get EconomicCodeCtrl(): FormControl {
    return this.customerFg.get('economicCodeCtrl') as FormControl;
  }
  get MobilePhoneCtrl(): FormControl {
    return this.customerFg.get('mobilePhoneCtrl') as FormControl;
  }
  get PhoneNumberCtrl(): FormControl {
    return this.customerFg.get('phoneNumberCtrl') as FormControl;
  }
  get StateCtrl(): FormControl {
    return this.customerFg.get('stateCtrl') as FormControl;
  }
  get CityCtrl(): FormControl {
    return this.customerFg.get('cityCtrl') as FormControl;
  }
  get AddressCtrl(): FormControl {
    return this.customerFg.get('addressCtrl') as FormControl;
  }
  get FactoryAddressCtrl(): FormControl {
    return this.customerFg.get('factoryAddressCtrl') as FormControl;
  }
  get ZipeCodeCtrl(): FormControl {
    return this.customerFg.get('zipeCodeCtrl') as FormControl;
  }

  customer(): void {
    let customers: Customers = {
      name: this.NameCtrl.value,
      nationallCode: this.NationallCodeCtrl.value,
      economicCode: this.EconomicCodeCtrl.value,
      mobilePhone: this.MobilePhoneCtrl.value,
      phoneNumber: this.PhoneNumberCtrl.value,
      state: this.StateCtrl.value,
      city: this.CityCtrl.value,
      address: this.AddressCtrl.value,
      factoryAddress: this.FactoryAddressCtrl.value,
      zipeCode: this.ZipeCodeCtrl.value
    }

    this.http.post<Customers>('http://localhost:5000/api/customers/customers/', customers).subscribe(
      {
        next: res => {
          this.customerRes = res;
          console.log(res);
          this.customerFg.reset();
        },
        error : err => {
          console.log(err.error);
          this.globError = err.error}
      }
    );
    this.customerFg.reset();
  }
}
