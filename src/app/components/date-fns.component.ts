import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { format } from 'date-fns';
import { ViewCodeComponent } from './view-code.component';

@Component({
  selector: 'demo-date-fns',
  template: `
    <div class="card-header">
      Using date-fns format date
      <view-code name="date-fns" />
    </div>
    <div class="card-body">
      <countdown [config]="config" />
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
export class DatefnsComponent {
  config: CountdownConfig = {
    leftTime: 60 * 60 * 48 * 365 * (2050 - 1970),
    format: 'yyyy-MM-dd E HH:mm:ss a',
    formatDate: ({ date, formatStr }) => format(date, formatStr),
  };
}
