import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { LoginUser } from '../../../models/loginUser.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    FormsModule, ReactiveFormsModule, RouterModule,
    MatFormFieldModule, MatIconModule, MatInputModule,
    MatButtonModule
  ]
})
export class LoginComponent {
  private accountServices = inject(AccountService);
  private fb = inject(FormBuilder);

  hide = true;

  apiErrorMassage: string | undefined;

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
