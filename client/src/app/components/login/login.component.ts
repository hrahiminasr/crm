import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Register } from 'src/app/models/register';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;

  registers: Register[] | undefined;

  constructor(private http: HttpClient) {
  }

  login(): void {
    this.http.get<Register[]>('http://localhost:5000/api/register/get-all').subscribe(
      {
        next: res => this.registers = res
      }
    );
  }
}
