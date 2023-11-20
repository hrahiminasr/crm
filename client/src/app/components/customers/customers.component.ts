import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Customers } from 'src/app/models/customers.model';
import { CustomerService as CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {
  // customerRes: Customers | undefined;
  customerIsRegister: boolean | undefined;
  apiErrorMassage: string | undefined;

  constructor(private fb: FormBuilder, private customerService: CustomerService) { }

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
