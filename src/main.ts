import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection, Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation, RouterOutlet } from '@angular/router';

import { provideCountdown } from 'ngx-countdown';

import { ROUTERS } from './app/router';

@Component({
  selector: 'app-root',
  template: `<router-outlet />`,
  imports: [RouterOutlet]
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideRouter(ROUTERS, withHashLocation()),
    provideCountdown()
  ]
}).catch(err => console.error(err));
