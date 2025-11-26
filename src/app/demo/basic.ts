import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
import { ViewCode } from './view-code';

@Component({
  selector: 'demo-basic',
  template: `
    <div class="card-header">
      Basic
      <view-code name="basic" />
    </div>
    <div class="card-body">
      <countdown [config]="{ leftTime: 30 }" />
    </div>
  `,
  host: {
    class: 'card text-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CountdownComponent, ViewCode],
})
export class Basic { }
