import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
import { ViewCodeComponent } from './view-code.component';

@Component({
  selector: 'demo-demand',
  template: `
    <div class="card-header">
      Demand
      <view-code name="demand"></view-code>
    </div>
    <div class="card-body">
      <countdown #cd [config]="{ leftTime: 30, demand: true }"></countdown>
      <div>
        <button (click)="cd.begin()" class="btn btn-link btn-sm">begin</button>
      </div>
    </div>
  `,
  host: {
    '[class.card]': `true`,
    '[class.text-center]': `true`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CountdownComponent, ViewCodeComponent],
})
export class DemandComponent {}
