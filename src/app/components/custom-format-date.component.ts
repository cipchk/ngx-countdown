import { ChangeDetectionStrategy, Component, Inject, LOCALE_ID } from '@angular/core';
import { CountdownConfig } from 'ngx-countdown';
import { formatDate } from '@angular/common';

const MINIUES = 1000 * 60;

@Component({
  selector: 'demo-custom-format-date',
  template: `
    <div class="card-header">
      Custom format date via formatDate
      <view-code name="custom-format-date"></view-code>
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
export class CustomFormatDateComponent {
  constructor(@Inject(LOCALE_ID) private locale: string) {}

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
