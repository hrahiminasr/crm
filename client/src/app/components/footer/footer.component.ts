import { Component } from '@angular/core';
import { Login } from 'src/app/models/login.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  date: Date | undefined;
  user: Login | null | undefined;
  constructor(private accountService: AccountService) {
    accountService.currentUser$.subscribe({
      next: res => this.user = res
    })

    setInterval(() => {
      this.date = new Date()
    }, 1000)
  }
}
