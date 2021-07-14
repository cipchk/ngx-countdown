import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountdownConfig } from 'ngx-countdown';

@Component({
  selector: 'demo-pretty-text',
  template: `
    <div class="card-header">
      Pretty text
      <view-code name="pretty-text"></view-code>
    </div>
    <div class="card-body">
      <countdown [config]="config" class="custom-style"></countdown>
    </div>
  `,
  host: {
    '[class.card]': `true`,
    '[class.text-center]': `true`,
  },
  styles: [
    `
      :host ::ng-deep .custom-style {
        font-size: 18px;
        .item {
          padding-left: 4px;
          &:nth-child(1) {
            color: rgb(199, 66, 0);
          }
          &:nth-child(2) {
            color: rgb(45, 0, 170);
          }
          &:nth-child(3) {
            color: rgb(207, 7, 147);
          }
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrettyTextComponent {
  config: CountdownConfig = {
    leftTime: 60,
    format: 'HH:mm:ss',
    prettyText: (text) => {
      return text
        .split(':')
        .map((v) => `<span class="item">${v}</span>`)
        .join('');
    },
  };
}
