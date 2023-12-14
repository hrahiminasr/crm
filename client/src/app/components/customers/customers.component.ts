import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Customers } from '../../models/customers.model';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  imports: [
    CommonModule, RouterModule, FormsModule,
    ReactiveFormsModule, MatFormFieldModule, MatButtonModule,
    MatInputModule
  ]
})
export class CustomersComponent {
  private fb = inject(FormBuilder);
  private customerService = inject(CustomerService);

  // customerRes: Customers | undefined;
  customerIsRegister: boolean | undefined;
  apiErrorMassage: string | undefined;

  customerFg = this.fb.group({
    nameCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    nationallCodeCtrl: [''],
    economicCodeCtrl: [''],
    mobilePhoneCtrl: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    phoneNumberCtrl: [''],
    stateCtrl: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
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
    this.apiErrorMassage = undefined;

    let customerInput: Customers = {
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

    if (this.MobilePhoneCtrl.value == customerInput.mobilePhone) {
      this.customerIsRegister = false;

      this.customerService.postCustomer(customerInput).subscribe(
        {
          next: res => {
            console.log(res)
            alert("مشتری با موفقیت ثبت شد");
            this.customerFg.reset();
          },
          error: err => {
            console.log(err.error);
            this.apiErrorMassage = err.error
            alert(this.apiErrorMassage)
          }
        }
      );
    }
    else
      this.customerIsRegister = true;
  }
}
