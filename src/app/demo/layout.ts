import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'demo-layout',
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" routerLink="/">ngx-countdown</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" routerLink="/">Demo</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/alot">1000 countdowns</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/nothing">Performance</a>
          </li>
        </ul>
      </div>
    </nav>
    <p class="mt-3 mb-3">Simple, easy and performance countdown for angular</p>
    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
})
export class Layout { }
