import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { ViewCode } from './view-code';

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
    class: 'card text-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CountdownComponent, ViewCode],
})
export class OnlySeconds {
  protected config: CountdownConfig = {
    leftTime: 60 * 3,
    formatDate: ({ date }) => `${date / 1000}`,
  };
}
