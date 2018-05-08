import { Component } from '@angular/core';
@Component({
  selector: 'demo-layout',
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" routerLink="/">ngx-countdown</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" routerLink="/">首页</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" routerLink="/alot">超多countdown</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" routerLink="/tpl">自定义模板</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" routerLink="/nothing">关于性能</a>
            </li>
          </ul>
        </div>
    </nav>
    <p class="mt-3 mb-3">Simple, easy and performance countdown for angular</p>
    <router-outlet></router-outlet>
    `,
})
export class LayoutComponent {}
