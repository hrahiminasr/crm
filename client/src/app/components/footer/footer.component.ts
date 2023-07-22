import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  date: Date | undefined;
  constructor() {
    setInterval(() => {
      this.date = new Date()
    }, 1000)
  }
}
