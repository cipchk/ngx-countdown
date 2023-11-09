import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { ViewCodeComponent } from './view-code.component';

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
  selector: 'more-than-24-hours',
  template: `
    <div class="card-header">
      More than 24 hours
      <view-code name="more-than-24-hours" />
    </div>
    <div class="card-body">
      <countdown #cd [config]="config" />
      <div>
        <button (click)="cd.pause()" class="btn btn-link btn-sm">pause</button>
        <button (click)="cd.resume()" class="btn btn-link btn-sm">resume</button>
        <button (click)="cd.stop()" class="btn btn-link btn-sm">stop</button>
        <button (click)="cd.restart()" class="btn btn-link btn-sm">restart</button>
      </div>
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
export class MoreThan24HoursComponent {
  config: CountdownConfig = {
    leftTime: 60 * 60 * 24 + 3,
    format: 'DD HH:mm:ss',
    formatDate: ({ date, formatStr }) => {
      let duration = Number(date || 0);

      return CountdownTimeUnits.reduce((current, [name, unit]) => {
        if (current.indexOf(name) !== -1) {
          const v = Math.floor(duration / unit);
          duration -= v * unit;
          return current.replace(new RegExp(`${name}+`, 'g'), (match: string) => {
            // When days is empty
            if (name === 'D' && v <= 0) {
              return '';
            }
            return v.toString().padStart(match.length, '0');
          });
        }
        return current;
      }, formatStr);
    },
  };
}
