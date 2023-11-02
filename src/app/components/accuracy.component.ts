import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
import { ViewCodeComponent } from './view-code.component';

@Component({
  selector: 'demo-accuracy',
  template: `
    <div class="card-header">
      Accuracy 0.1s
      <view-code name="accuracy"></view-code>
    </div>
    <div class="card-body">
      <countdown [config]="{ leftTime: 10000, format: '剩余时间：h时m分s.S秒' }"></countdown>
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
export class AccuracyComponent {}
