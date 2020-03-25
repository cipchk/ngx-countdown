// tslint:disable: member-ordering
import { Component, ViewEncapsulation, ViewChild, Inject, LOCALE_ID, DoCheck } from '@angular/core';
import { formatDate } from '@angular/common';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { format } from 'date-fns';

const MINIUES = 1000 * 60;
const CountdownTimeUnits: Array<[string, number]> = [
  ['Y', 1000 * 60 * 60 * 24 * 365], // years
  ['M', 1000 * 60 * 60 * 24 * 30], // months
  ['D', 1000 * 60 * 60 * 24], // days
  ['H', 1000 * 60 * 60], // hours
  ['m', 1000 * 60], // minutes
  ['s', 1000], // seconds
  ['S', 1], // million seconds
];

@Component({
  selector: 'demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DemoComponent implements DoCheck {
  @ViewChild('countdown', { static: false }) private counter: CountdownComponent;
  doCheckCounter = 0;
  stopConfig: CountdownConfig = { stopTime: new Date().getTime() + 1000 * 30 };
  notify: string;
  config: CountdownConfig = { leftTime: 10 };
  notifyConfig: CountdownConfig = { leftTime: 10, notify: [2, 5] };
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
    prettyText: (text) => {
      return text
        .split(':')
        .map((v) => `<span class="item">${v}</span>`)
        .join('');
    },
  };
  moreThan24Hours: CountdownConfig = {
    leftTime: 60 * 60 * 25,
    formatDate: ({ date, formatStr }) => {
      let duration = Number(date || 0);

      return CountdownTimeUnits.reduce((current, [name, unit]) => {
        if (current.indexOf(name) !== -1) {
          const v = Math.floor(duration / unit);
          duration -= v * unit;
          return current.replace(new RegExp(`${name}+`, 'g'), (match: string) => {
            return v.toString().padStart(match.length, '0');
          });
        }
        return current;
      }, formatStr);
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
    console.log('Actions', e);
  }

  handleEvent2(e: CountdownEvent) {
    this.notify = e.action.toUpperCase();
    if (e.action === 'notify') {
      this.notify += ` - ${e.left} ms`;
    }
    console.log('Notify', e);
  }

  ngDoCheck() {
    console.log(this.doCheckCounter++);
  }
}
