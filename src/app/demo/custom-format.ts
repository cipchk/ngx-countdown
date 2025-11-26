import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
import { ViewCode } from './view-code';

@Component({
  selector: 'demo-custom-format',
  template: `
    <div class="card-header">
      Custom format
      <view-code name="custom-format" />
    </div>
    <div class="card-body">
      <countdown [config]="{ leftTime: 100, format: 'm:s' }" />
    </div>
  `,
  host: {
    class: 'card text-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CountdownComponent, ViewCode],
})
export class CustomFormat { }
