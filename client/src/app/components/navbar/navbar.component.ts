import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { Login } from '../../models/login.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';


@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    CommonModule, RouterModule, MatToolbarModule,
    MatIconModule, MatMenuModule, MatButtonModule
  ]
})

export class NavbarComponent implements OnInit {
  private accountServices = inject(AccountService);
  private router = inject(Router);

  // user: Login | null | undefined;
  user$: Observable<Login | null> | undefined;

  ngOnInit(): void {
    this.user$ = this.accountServices.currentUser$;
  }

  logout(): void {
    this.accountServices.logout();
    this.router.navigateByUrl('/');
  }
}