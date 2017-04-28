import { Component } from '@angular/core';
@Component({
    selector: 'demo-layout',
    template: `
    <nav class="navbar navbar-toggleable-md navbar-light bg-faded mb-3">
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">ngx-countdown</a>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
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
    <p class="mb-3">Simple, easy and performance countdown for angular</p>
    <router-outlet></router-outlet>
    `
})
export class LayoutComponent {}
