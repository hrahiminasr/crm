import { Component, OnInit, inject } from '@angular/core';
import { Login } from '../../models/login.model';
import { AccountService } from '../../services/account.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [
    CommonModule, MatToolbarModule
  ]
})
export class FooterComponent implements OnInit {
  private accountService = inject(AccountService);

  date: Date | undefined;
  user: Login | null | undefined;

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe({
      next: res => this.user = res
    })

    setInterval(() => {
      this.date = new Date()
    }, 1000)
  }
}
