import { Component } from '@angular/core';
import { CountdownModule } from 'ngx-countdown';

@Component({
  selector: 'standalone-demo',
  template: ` <countdown [config]="{ leftTime: 30 }"></countdown> `,
  standalone: true,
  imports: [CountdownModule],
})
export class StandaloneComponent {}
