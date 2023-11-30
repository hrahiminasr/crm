import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginUser } from 'src/app/models/loginUser.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;

  apiErrorMassage: string | undefined;

  constructor(private accountServices: AccountService, private fb: FormBuilder) { }

  loginFg: FormGroup = this.fb.group({
    userNameCtrl: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    passwordCtrl: ['', [Validators.required, Validators.minLength(8)]]
  });

  get UserNameCtrl(): FormControl {
    return this.loginFg.get('userNameCtrl') as FormControl;
  }
  get PasswordCtrl(): FormControl {
    return this.loginFg.get('passwordCtrl') as FormControl;
  }

  login(): void {
    this.apiErrorMassage = undefined;

    let login: LoginUser = {
      userName: this.UserNameCtrl.value,
      password: this.PasswordCtrl.value
    }

    this.accountServices.login(login).subscribe({
      next: res => {
        console.log(res)
      },
      error: err => this.apiErrorMassage = err.error
    })
  }
}
