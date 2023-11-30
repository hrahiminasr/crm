import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/login.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  // user: Login | null | undefined;
  user$: Observable<Login | null> | undefined;
  
  constructor(private accountServices: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.user$ = this.accountServices.currentUser$;
  }

  logout(): void {
    this.accountServices.logout();
    this.router.navigateByUrl('/');
  }
}