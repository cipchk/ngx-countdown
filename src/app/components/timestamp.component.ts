import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountdownConfig } from 'ngx-countdown';

@Component({
  selector: 'demo-timestamp',
  template: `
    <div class="card-header">
      Unix timestamp
      <view-code name="timestamp"></view-code>
    </div>
    <div class="card-body">
      <p class="card-text">指的是根据本地时间至结束时间进行倒计时</p>
      <countdown [config]="config"></countdown>
      <div>
        <button (click)="resetStop()" class="btn btn-link btn-sm">Reset</button>
      </div>
    </div>
  `,
  host: {
    '[class.card]': `true`,
    '[class.text-center]': `true`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimestampComponent {
  config: CountdownConfig = { stopTime: new Date().getTime() + 1000 * 30 };

  resetStop() {
    this.config = { stopTime: new Date().getTime() + 1000 * 30 };
  }
}
