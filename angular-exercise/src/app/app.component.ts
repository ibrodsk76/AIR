import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-exercise';

  constructor(private router: Router) {
  }

  isActive(item: any): boolean {
    return this.router.isActive(item,true);
  }
}
