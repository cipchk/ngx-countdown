import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withHashLocation } from '@angular/router';
import { ROUTERS } from './app/router';
import { CountdownConfig, CountdownGlobalConfig } from 'ngx-countdown';

export function countdownConfigFactory(): CountdownConfig {
  return {};
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(ROUTERS, withHashLocation()),
    { provide: CountdownGlobalConfig, useFactory: countdownConfigFactory },
  ],
}).catch((err) => console.error(err));
