import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { Login } from './models/login.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  allCustomer: Login[] | undefined;

  user$: Observable<Login | null> | undefined;

  constructor(private accountServices: AccountService) { }

  ngOnInit(): void {
    this.getLocalStorageCurrentValue();

    this.user$ = this.accountServices.currentUser$;
  }

  getLocalStorageCurrentValue(): void {
    const userString: string | null = localStorage.getItem('user');

    if (userString) {
      const user: Login = JSON.parse(userString);

      this.accountServices.setcurrentUser(user);
    }
  }
}
