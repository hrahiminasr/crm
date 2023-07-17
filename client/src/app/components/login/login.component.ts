import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;

  globLogin: Login | undefined;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  loginFg = this.fb.group({
    userNameCtrl: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    passwordCtrl: ['', [Validators.required, Validators.minLength(8)]]
  });

  get UserNameCtrl(): FormControl {
    return this.loginFg.get('userNameCtrl') as FormControl;
  }
  get PasswordCtrl(): FormControl {
    return this.loginFg.get('passwordCtrl') as FormControl;
  }

  Login(): void {
    let login: Login = {
      userName: this.UserNameCtrl.value,
      password: this.PasswordCtrl.value
    }

    this.http.post<Login>('http://localhost:5000/api/register/login', login).subscribe(
      { next: res => this.globLogin = res }
    )
  }
}
