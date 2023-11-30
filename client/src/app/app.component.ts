import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { Login } from './models/login.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  allCustomer: Login[] | undefined;
  constructor(private accountServices: AccountService) {}

  ngOnInit(): void {
    this.getLocalStorageCurrentValue();
  }

  getLocalStorageCurrentValue(): void {
    const userString: string | null = localStorage.getItem('user');

    if (userString) {
      const user: Login = JSON.parse(userString);

      this.accountServices.setcurrentUser(user);
    }
  }
}
