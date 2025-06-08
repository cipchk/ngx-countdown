import { ChangeDetectionStrategy, Component, inject, LOCALE_ID } from '@angular/core';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { formatDate } from '@angular/common';
import { ViewCodeComponent } from './view-code.component';

const MINIUES = 1000 * 60;

@Component({
  selector: 'demo-custom-format-date',
  template: `
    <div class="card-header">
      Custom format date via formatDate
      <view-code name="custom-format-date" />
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
  imports: [CountdownComponent, ViewCodeComponent],
})
export class CustomFormatDateComponent {
  private locale = inject(LOCALE_ID);

  config: CountdownConfig = {
    leftTime: 65,
    formatDate: ({ date, formatStr, timezone }) => {
      let f = formatStr;
      if (date > MINIUES) {
        f = 'm分s秒';
      } else if (date === MINIUES) {
        f = 'm分';
      } else {
        f = 's秒';
      }
      return formatDate(date, f, this.locale, timezone || '+0000');
    },
  };
}
