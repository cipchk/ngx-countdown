import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { ViewCodeComponent } from './view-code.component';

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
    '[class.card]': `true`,
    '[class.text-center]': `true`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CountdownComponent, ViewCodeComponent],
})
export class KeepingWhenRefreshComponent implements OnInit {
  config: CountdownConfig = { leftTime: DEFAULT, notify: 0 };

  ngOnInit(): void {
    let value = +localStorage.getItem(KEY)!! ?? DEFAULT;
    if (value <= 0) value = DEFAULT;
    this.config = { ...this.config, leftTime: value };
  }

  handleEvent(ev: CountdownEvent) {
    if (ev.action === 'notify') {
      // Save current value
      localStorage.setItem(KEY, `${ev.left / 1000}`);
    }
  }
}
