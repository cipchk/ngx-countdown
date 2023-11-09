import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { ViewCodeComponent } from './view-code.component';

@Component({
  selector: 'demo-actions',
  template: `
    <div class="card-header">
      Actions
      <view-code name="actions" />
    </div>
    <div class="card-body">
      <countdown #cd (event)="handleEvent($event)" [config]="{ leftTime: 30 }" />
      <div>
        <button (click)="cd.pause()" class="btn btn-link btn-sm">pause</button>
        <button (click)="cd.resume()" class="btn btn-link btn-sm">resume</button>
        <button (click)="cd.stop()" class="btn btn-link btn-sm">stop</button>
        <button (click)="cd.restart()" class="btn btn-link btn-sm">restart</button>
      </div>
      <div class="alert alert-light">TIPS: Open console panel in chrome</div>
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
export class ActionsComponent {
  config: CountdownConfig = {
    leftTime: 60,
    format: 'HH:mm:ss',
    prettyText: (text) => {
      return text
        .split(':')
        .map((v) => `<span class="item">${v}</span>`)
        .join('');
    },
  };

  handleEvent(e: CountdownEvent) {
    console.log('Actions', e);
  }
}
