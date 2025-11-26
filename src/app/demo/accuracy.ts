import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
import { ViewCode } from './view-code';

@Component({
  selector: 'demo-accuracy',
  template: `
    <div class="card-header">
      Accuracy 0.1s
      <view-code name="accuracy" />
    </div>
    <div class="card-body">
      <countdown [config]="{ leftTime: 10000, format: '剩余时间：h时m分s.S秒' }" />
    </div>
  `,
  host: {
    class: 'card text-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CountdownComponent, ViewCode],
})
export class Accuracy { }
