import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { ViewCodeComponent } from './view-code.component';

@Component({
  selector: 'demo-timestamp',
  template: `
    <div class="card-header">
      Unix timestamp
      <view-code name="timestamp" />
    </div>
    <div class="card-body">
      <p class="card-text">指的是根据本地时间至结束时间进行倒计时</p>
      <countdown [config]="config" />
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
  imports: [CountdownComponent, ViewCodeComponent],
})
export class TimestampComponent {
  config: CountdownConfig = { stopTime: new Date().getTime() + 1000 * 30 };

  resetStop() {
    this.config = { stopTime: new Date().getTime() + 1000 * 30 };
  }
}
