import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountdownConfig } from 'ngx-countdown';
import { format } from 'date-fns';

@Component({
  selector: 'demo-date-fns',
  template: `
    <div class="card-header">
      Using date-fns format date
      <view-code name="date-fns"></view-code>
    </div>
    <div class="card-body">
      <countdown [config]="config"></countdown>
    </div>
  `,
  host: {
    '[class.card]': `true`,
    '[class.text-center]': `true`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatefnsComponent {
  config: CountdownConfig = {
    leftTime: 60 * 60 * 24 * 365 * (2050 - 1970),
    format: 'yyyy-MM-dd E HH:mm:ss a',
    formatDate: ({ date, formatStr }) => format(date, formatStr),
  };
}
