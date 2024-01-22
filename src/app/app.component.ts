import { Component } from '@angular/core';
import { FishComponent } from './fish/fish.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <main>
      <header class='brand-name'>
        <a routerLink="/" class='brand-link'>
          <img class='brand-logo' src='/assets/logo.svg' alt='logo' aria-hidden='true' width='70'>
          <h1 class='brand-heading'>Fish world</h1>
        </a>
      </header>
      <section class='content'>
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
  imports: [FishComponent, RouterModule]
})
export class AppComponent {
  title = 'fishes';
}
