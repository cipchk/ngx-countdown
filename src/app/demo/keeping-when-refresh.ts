import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { ViewCode } from './view-code';

const KEY = 'time';
const DEFAULT = 50;

@Component({
  selector: 'demo-keeping-when-refresh',
  template: `
    <div class="card-header">
      Keeping when refresh page
      <view-code name="keeping-when-refresh" />
    </div>
    <div class="card-body">
      <countdown [config]="config" (event)="handleEvent($event)" />
    </div>
  `,
  host: {
    class: 'card text-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CountdownComponent, ViewCode],
})
export class KeepingWhenRefresh implements OnInit {
  protected config: CountdownConfig = { leftTime: DEFAULT, notify: 0 };

  ngOnInit(): void {
    let value = +localStorage.getItem(KEY)!;
    if (value <= 0 || isNaN(value)) value = DEFAULT;
    this.config = { ...this.config, leftTime: value };
  }

  protected handleEvent(ev: CountdownEvent) {
    if (ev.action === 'notify') {
      // Save current value
      localStorage.setItem(KEY, `${ev.left / 1000}`);
    }
  }
}
