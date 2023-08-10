import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, RouterEvent, RouterLink } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { NotFoundComponent } from '../not-found/not-found.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;

  globLogin: Login | undefined;
  globError: string | undefined;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

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
    this.http.get<Login>('http://localhost:5000/api/register/get-by-username/' + this.UserNameCtrl.value + '/' + this.PasswordCtrl.value).subscribe(
      {
        next: res => {
          this.globLogin = res
          this.router.navigateByUrl('/home');
        },
        error: err => {
          console.log(err.error);
          this.globError = err.error
        }
      }
    )
  }
}
