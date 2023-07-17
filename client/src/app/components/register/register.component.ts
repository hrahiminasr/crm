import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Register } from 'src/app/models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  hide = true;

  registerRes: Register | undefined;

  constructor(private fb: FormBuilder, private http: HttpClient) {
  }

  registerFg = this.fb.group({
    firstNameCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    lastNameCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    userNameCtrl: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    passwordCtrl: ['', [Validators.required, Validators.minLength(8)]],
    phoneNumberCtrl: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    userSideCtrl: ['', [Validators.required]],
    emailCtrl: ['', [Validators.pattern(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$/)]]
  });

  get FirstNameCtrl(): FormControl {
    return this.registerFg.get('firstNameCtrl') as FormControl;
  }
  get LastNameCtrl(): FormControl {
    return this.registerFg.get('lastNameCtrl') as FormControl;
  }
  get UserNameCtrl(): FormControl {
    return this.registerFg.get('userNameCtrl') as FormControl;
  }
  get PasswordCtrl(): FormControl {
    return this.registerFg.get('passwordCtrl') as FormControl;
  }
  get PhoneNumberCtrl(): FormControl {
    return this.registerFg.get('phoneNumberCtrl') as FormControl;
  }
  get UserSideCtrl(): FormControl {
    return this.registerFg.get('userSideCtrl') as FormControl;
  }
  get EmailCtrl(): FormControl {
    return this.registerFg.get('emailCtrl') as FormControl;
  }

  register(): void {
    console.log(this.registerFg.value);

    let register: Register = {
      firstName: this.FirstNameCtrl.value,
      lastName: this.LastNameCtrl.value,
      userName: this.UserNameCtrl.value,
      password: this.PasswordCtrl.value,
      phoneNumber: this.PhoneNumberCtrl.value,
      userSide: this.UserSideCtrl.value,
      email: this.EmailCtrl.value
    }

    this.http.post<Register>('http://localhost:5000/api/register/register', register).subscribe(
      {
        next: res => {
          this.registerRes = res;
          console.log(res);
        }
      }
    );
  }
}
