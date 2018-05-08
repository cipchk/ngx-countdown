import { Component, ViewEncapsulation } from '@angular/core';
import { Config } from 'ngx-countdown';

@Component({
  selector: 'demo-tpl-flip',
  templateUrl: './flip.component.html',
  styleUrls: ['./flip.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TplFlipComponent {
  config: Config = {
    leftTime: 60 * 60 * 24 * 7,
    repaint: function() {
      // 这里不可以使用箭头函数，因为对于箭头函数this是强制性的，为了让重绘有更大的权限，必须是function
      const me: any = this;
      let content: string;

      me.hands.forEach((hand: any) => {
        if (hand.lastValue !== hand.value) {
          content = '';
          const cur = me.toDigitals(hand.value + 1, hand.bits).join(''),
            next = me.toDigitals(hand.value, hand.bits).join('');

          hand.node.innerHTML = `
            <span class="count curr top">${cur}</span>
            <span class="count next top">${next}</span>
            <span class="count next bottom">${next}</span>
            <span class="count curr bottom">${cur}</span>
          `;
          hand.node.parentElement.className = 'time';
          setTimeout(() => {
            hand.node.parentElement.className = 'time flip';
          });
        }
      });
    },
  };
}
