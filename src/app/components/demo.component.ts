// tslint:disable: member-ordering
import { Component, ViewEncapsulation, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { format } from 'date-fns';

const MINIUES = 1000 * 60;

@Component({
  selector: 'demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DemoComponent {
  @ViewChild('countdown', { static: false }) private counter: CountdownComponent;
  stopConfig: CountdownConfig = { stopTime: new Date().getTime() + 1000 * 30 };
  notify: string;
  config: CountdownConfig = { leftTime: 10, notify: [2, 5] };
  customFormat: CountdownConfig = {
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
  dateFnsConfig: CountdownConfig = {
    leftTime: 60 * 60 * 24 * 365 * (2050 - 1970),
    format: 'yyyy-MM-dd E HH:mm:ss a',
    formatDate: ({ date, formatStr }) => format(date, formatStr),
  };
  prettyConfig: CountdownConfig = {
    leftTime: 60,
    format: 'HH:mm:ss',
    prettyText: text => {
      return text
        .split(':')
        .map(v => `<span class="item">${v}</span>`)
        .join('');
    },
  };

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  resetStop() {
    this.stopConfig = { stopTime: new Date().getTime() + 1000 * 30 };
  }

  resetTimer() {
    this.counter.restart();
  }

  handleEvent(e: CountdownEvent) {
    console.log(e);
  }

  handleEvent2(e: CountdownEvent) {
    this.notify = e.action.toUpperCase();
    if (e.action === 'notify') {
      this.notify += ` - ${e.left} ms`;
    }
    console.log(e);
  }
}
