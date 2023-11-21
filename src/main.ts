import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withHashLocation } from '@angular/router';
import { ROUTERS } from './app/router';
import { provideCountdown } from 'ngx-countdown';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideRouter(ROUTERS, withHashLocation()), provideCountdown()],
}).catch((err) => console.error(err));
