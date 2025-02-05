import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    CommonModule, // Import CommonModule to use *ngIf
    HeaderComponent
  ]
})
export class AppComponent {
  title = 'angular-identity-app';
  showHeader: boolean | undefined;

  constructor(private router: Router) {
    this.showHeader = true;

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showHeader = !['/login', '/register'].includes(event.urlAfterRedirects);
    });
  }
}
