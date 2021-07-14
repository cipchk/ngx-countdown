import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountdownConfig } from 'ngx-countdown';

@Component({
  selector: 'demo-only-seconds',
  template: `
    <div class="card-header">
      Only Seconds
      <view-code name="only-seconds"></view-code>
    </div>
    <div class="card-body">
      <countdown [config]="config"></countdown>
    </div>
  `,
  host: {
    '[class.card]': `true`,
    '[class.text-center]': `true`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnlySecondsComponent {
  config: CountdownConfig = {
    leftTime: 60 * 3,
    formatDate: ({ date }) => `${date / 1000}`,
  };
}
