import { Injectable } from '@angular/core';
import { Hand } from './interfaces/hand';

export interface IEffect {
    [key: string]: string;
    normal: any;
}

declare const window: any;

@Injectable()
export class Effect {

    normal: any = {
        paint: function () {
            let me = this,
                content: string;

            me.hands.forEach((hand: Hand) => {
                if (hand.lastValue !== hand.value) {
                    content = '';

                    me._toDigitals(hand.value, hand.bits).forEach((digital: number) => {
                        content += me._html(digital, '', 'digital');
                    });

                    hand.node.innerHTML = content;
                }
            });
        }
    }

    slide: any = {
        paint: function () {
            let me = this,
                content: string,
                bits: number,
                digitals: number[],
                oldDigitals: number[];

            // 找到值发生改变的hand
            me.hands.forEach((hand: Hand) => {
                if (hand.lastValue !== hand.value) {
                    // 生成新的markup
                    content = '';
                    bits = hand.bits;
                    digitals = me._toDigitals(hand.value, bits);
                    if (hand.lastValue === undefined) {
                        oldDigitals = digitals;
                    } else {
                        oldDigitals = me._toDigitals(hand.lastValue, bits);
                    }

                    while (bits--) {
                        if (oldDigitals[bits] !== digitals[bits]) {
                            content = me._html([me._html(digitals[bits], '', 'digital'), me._html(oldDigitals[bits], '', 'digital')], 'slide-wrap') + content;
                        } else {
                            content = me._html(digitals[bits], '', 'digital') + content;
                        }
                    }

                    // 并更新
                    hand.node.innerHTML = content;
                }
            });
        },
        afterPaint: function () {
            // this.hands.forEach((hand: Hand) => {
            //     if (hand.lastValue !== hand.value && hand.lastValue !== undefined) {

            //          let node = hand.node,
            //              height = window.getComputedStyle(node.querySelector('.digital')).height;

            //         console.log(height)

            //         // node.css('height', height);
            //         // node.all('.slide-wrap').css('top', -height).animate('top: 0', 0.5, 'easeIn');
            //     }
            // });
        }
    }

    flip: any = {
        paint: function () {
            let me = this,
                content;
        }
    }

}
