import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withHashLocation } from '@angular/router';
import { ROUTERS } from './app/router';
import { provideCountdown } from 'ngx-countdown';
import { provideZonelessChangeDetection } from '@angular/core';

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `<router-outlet />`,
  imports: [RouterOutlet],
})
export class App { }

bootstrapApplication(App, {
  providers: [provideZonelessChangeDetection(), provideHttpClient(), provideRouter(ROUTERS, withHashLocation()), provideCountdown()],
}).catch((err) => console.error(err));
