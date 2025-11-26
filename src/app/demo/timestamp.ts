import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { ViewCode } from './view-code';

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
    class: 'card text-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CountdownComponent, ViewCode],
})
export class Timestamp {
  protected config: CountdownConfig = { stopTime: new Date().getTime() + 1000 * 30 };

  protected resetStop() {
    this.config = { stopTime: new Date().getTime() + 1000 * 30 };
  }
}
