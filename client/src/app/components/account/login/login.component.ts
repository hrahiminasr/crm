import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, RouterEvent, RouterLink } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { LoginService } from 'src/app/services/login.service';
import { LoginUser } from 'src/app/models/loginUser.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;

  apiErrorMassage: string | undefined;

  constructor(private loginServices: LoginService, private fb: FormBuilder, private router: Router) { }

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

  login(): void {
    this.apiErrorMassage = undefined;

    let login: LoginUser = {
      userName: this.UserNameCtrl.value,
      password: this.PasswordCtrl.value
    }

    this.loginServices.login(login).subscribe({
      next: login => {
        this.router.navigateByUrl('/home');
      },
      error: err => this.apiErrorMassage = err.error
    })
  }
}
