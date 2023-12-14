import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { Login } from './models/login.model';
import { Observable } from 'rxjs';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule, RouterModule, NavbarComponent, FooterComponent
  ]
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
