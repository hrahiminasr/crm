import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Register } from 'src/app/models/register.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public adminLogin: Register | undefined;

  constructor(private http: HttpClient) { }

  LoginAdmin(): void{
    this.http.get<Register>('http://localhost:5000/api/register/get-by-userside').subscribe(
      {

        next: res => {this.adminLogin = res
        // console.log("Hello")
        }
      }
    )
  }
}

