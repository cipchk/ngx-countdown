import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';

@Component({
  selector: 'demo-notify',
  template: `
    <div class="card-header">
      Notify
      <view-code name="notify"></view-code>
    </div>
    <div class="card-body">
      <p class="card-text">Notify at 2, 5 seconds</p>
      <countdown #cd [config]="config" (event)="handleEvent($event)"></countdown>
      <div>
        <button (click)="cd.restart()" class="btn btn-link btn-sm">Reset(using restart function)</button>
      </div>
    </div>
    <div class="card-footer">{{ notify }}</div>
  `,
  host: {
    '[class.card]': `true`,
    '[class.text-center]': `true`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotifyComponent {
  config: CountdownConfig = { leftTime: 10, notify: [2, 5] };
  notify = '';

  handleEvent(e: CountdownEvent) {
    this.notify = e.action.toUpperCase();
    if (e.action === 'notify') {
      this.notify += ` - ${e.left} ms`;
    }
    console.log('Notify', e);
  }
}
