import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { ViewCodeComponent } from './view-code.component';

@Component({
  selector: 'demo-only-seconds',
  template: `
    <div class="card-header">
      Only Seconds
      <view-code name="only-seconds" />
    </div>
    <div class="card-body">
      <countdown [config]="config" />
    </div>
  `,
  host: {
    '[class.card]': `true`,
    '[class.text-center]': `true`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CountdownComponent, ViewCodeComponent],
})
export class OnlySecondsComponent {
  config: CountdownConfig = {
    leftTime: 60 * 3,
    formatDate: ({ date }) => `${date / 1000}`,
  };
}
