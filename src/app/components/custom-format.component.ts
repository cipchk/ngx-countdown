import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
import { ViewCodeComponent } from './view-code.component';

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
    '[class.card]': `true`,
    '[class.text-center]': `true`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CountdownComponent, ViewCodeComponent],
})
export class CustomFormatComponent {}
