import { Component, ElementRef, ViewEncapsulation, Input, Renderer, OnChanges, SimpleChanges, OnDestroy, Output, EventEmitter, Inject } from '@angular/core';
import { Config } from './interfaces/config';
import { Hand } from './interfaces/hand';
import { Timer } from './timer';
import { Effect, IEffect } from './effect';

@Component({
    selector: 'countdown',
    template: `<ng-content></ng-content>`,
    styles: [`
    `],
    encapsulation: ViewEncapsulation.None
})
export class CountdownComponent implements OnChanges, OnDestroy {

    @Input() config: Config;

    constructor(private el: ElementRef,
        private renderer: Renderer,
        private timer: Timer,
        @Inject(Effect) private effect: IEffect) {
        this.timer.start();
    }

    ngOnInit() {
        this.init();
    }

    ngOnDestroy(): void {
        this.destroy();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!changes.config.firstChange) this.init();
    }

    private frequency: number = 1000;
    private _notify: any[] = [];
    private hands: Hand[] = [];
    private left: number = 0;

    private init() {
        const me = this;
        const el = me.el.nativeElement;

        me.config = Object.assign(<Config>{
            leftTime: 0,
            template: '$!d!天$!h!时$!m!分',
            size: 'lite',
            effect: 'normal',
            varRegular: /\$\!([\-\w]+)\!/g,
            clock: ['d', 100, 2, 'h', 24, 2, 'm', 60, 2, 's', 60, 2, 'u', 10, 1]
        }, me.config);

        this.renderer.setElementClass(el, 'count-down', true);
        this.renderer.setElementClass(el, me.config.size, true);
        this.renderer.setElementClass(el, me.config.effect, true);

        // 分析markup
        let tmpl = el.innerHTML;
        me.config.varRegular.lastIndex = 0;
        el.innerHTML = tmpl.replace(me.config.varRegular, (str: string, type: string) => {
            // 时钟频率校正.
            if (type === 'u' || type === 's-ext')
                me.frequency = 100;

            // 生成hand的markup
            let content = '';
            if (type === 's-ext') {
                me.hands.push({ type: 's' });
                me.hands.push({ type: 'u' });
                content = me._html('', 's', 'handlet') +
                    me._html('.', '', 'digital') +
                    me._html('', 'u', 'handlet');
            } else {
                me.hands.push({ type: type });
            }

            return me._html(content, type, 'hand');
        });

        const clock = me.config.clock;
        me.hands.forEach((hand: Hand) => {
            let type = hand.type,
                base: number = 100,
                i: number;

            hand.node = el.querySelector(`.hand-${type}`);
            // radix, bits 初始化
            for (i = clock.length - 3; i > -1; i -= 3) {
                if (type === clock[i]) {
                    break;
                }

                base *= clock[i + 1];
            }
            hand.base = base;
            hand.radix = clock[i + 1];
            hand.bits = clock[i + 2];
        });

        me.getLeft();
        me.reflow();

        // bind reflow to me
        const _reflow = me.reflow;
        me.reflow = (count: number = 0) => {
            return _reflow.apply(me, [count]);
        };

        me.timer.add(me.reflow, me.frequency);
        // show
        el.style.display = 'inline'
    }

    private destroy() {
        this.timer.remove(this.reflow);
    }

    /**
     * 更新时钟
     */
    private reflow(count: number = 0): void {
        const me = this;
        me.left = me.left - me.frequency * count;

        me.hands.forEach((hand: Hand) => {
            hand.lastValue = hand.value;
            hand.value = Math.floor(me.left / hand.base) % hand.radix;
        });

        me.repaint();

        if (me._notify[me.left]) {
            me._notify[me.left].forEach((fn: Function) => {
                if (fn) fn.call(me);
            })
        }

        if (me.left < 1)
            this.destroy();
    }

    /**
     * 重绘时钟
     */
    private repaint(): void {
        const ef = this.effect[this.config.effect];
        ef.paint.apply(this);
        if (ef.afterPaint) ef.afterPaint.apply(this);
    }

    /**
     * 获取倒计时剩余帧数
     */
    private getLeft(): void {
        let left: number = this.config.leftTime * 1000,
            end: number = this.config.stopTime;

        if (!left && end)
            left = end - new Date().getTime();

        this.left = left - left % this.frequency;
    }

    /**
     * 生成需要的html代码，辅助工具
     */
    private _html(con: string | any[], className: string, type: string): string {
        if (con instanceof Array) {
            con = con.join('');
        }

        switch (type) {
            case 'hand':
            case 'handlet':
                className = type + ' hand-' + className;
                break;
            case 'digital':
                if (con === '.') {
                    className = type + ' ' + type + '-point ' + className;
                } else {
                    className = type + ' ' + type + '-' + con + ' ' + className;
                }
                break;
        }
        return '<i class="' + className + '">' + con + '</i>';
    }

    /**
     * 把值转换为独立的数字形式
     */
    private _toDigitals(value: number, bits: number): number[] {
        value = value < 0 ? 0 : value;
        let digitals = [];
        // 把时、分、秒等换算成数字.
        while (bits--) {
            digitals[bits] = value % 10;
            value = Math.floor(value / 10);
        }
        return digitals;
    }

}
