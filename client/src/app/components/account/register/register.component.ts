import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  hide = true;

  // registerRes: Register | undefined;
  // globError: string | undefined;
  passwordsNotMatch: boolean | undefined;
  apiErrorMassage: string | undefined;
  // globShow: RegisterById | undefined;

  userTitle: string[] = ["مدیر ارشد", "مدیر اجرایی و اداری", "مسئول فروش", "مدیر تولید"];

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) { }

  registerFg = this.fb.group({
    firstNameCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    lastNameCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    userNameCtrl: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    passwordCtrl: ['', [Validators.required, Validators.minLength(8)]],
    confirmPasswordCtrl: ['', [Validators.required, Validators.minLength(8)]],
    userTitleCtrl: ['', [Validators.required]],
    userRoleCtrl: ['', [Validators.required]],
    addressCtrl: ['', [Validators.required]],
    phoneNumberCtrl: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
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
  get ConfirmPasswordCtrl(): FormControl {
    return this.registerFg.get('confirmPasswordCtrl') as FormControl;
  }
  get UserTitleCtrl(): FormControl {
    return this.registerFg.get('userTitleCtrl') as FormControl;
  }
  get UserRoleCtrl(): FormControl {
    return this.registerFg.get('userRoleCtrl') as FormControl;
  }
  get AddressCtrl(): FormControl {
    return this.registerFg.get('addressCtrl') as FormControl;
  }
  get PhoneNumberCtrl(): FormControl {
    return this.registerFg.get('phoneNumberCtrl') as FormControl;
  }
  get EmailCtrl(): FormControl {
    return this.registerFg.get('emailCtrl') as FormControl;
  }

  register(): void {
    this.apiErrorMassage = undefined;

    if (this.PasswordCtrl.value === this.ConfirmPasswordCtrl.value) {
      this.passwordsNotMatch = false;

      let userInput: Register = {
        firstName: this.FirstNameCtrl.value,
        lastName: this.LastNameCtrl.value,
        userName: this.UserNameCtrl.value,
        password: this.PasswordCtrl.value,
        confirmPassword: this.ConfirmPasswordCtrl.value,
        userTitle: this.UserTitleCtrl.value,
        userRole: this.UserRoleCtrl.value,
        address: this.AddressCtrl.value,
        phoneNumber: this.PhoneNumberCtrl.value,
        email: this.EmailCtrl.value
      }

      this.accountService.register(userInput).subscribe({
        next: register => {
          console.log(register);
          alert("کاربر با موفقیت ثبت شد");
          this.router.navigateByUrl('/home');

        },
        error: err => {
          this.apiErrorMassage = err.error
          alert(this.apiErrorMassage)
        }

      })
    }
    else {
      this.passwordsNotMatch = true;
      alert("کلمه عبور با تکرار کلمه عبور یکسان نیست");
    }
  }
}

