import { Component, ElementRef, ViewEncapsulation, Input, Renderer, OnChanges, SimpleChanges, OnDestroy, Output, EventEmitter, HostBinding } from '@angular/core';
import { Config } from './interfaces/config';
import { Hand } from './interfaces/hand';
import { Timer } from './timer';

@Component({
    selector: 'countdown',
    template: `<ng-content></ng-content>`,
    host: {
        '[class]': 'cls'
    },
    styles: [`
.count-down{display:none;color:#808080;font-size:12px;font-family:arial, '\5b8b\4f53'}.count-down span{text-decoration:none}.count-down .clock{font-weight:bold}.count-down .hand{margin:0 3px}.count-down .digital{color:#f60;font-size:14px;font-weight:normal}.count-down.medium .digital{color:#404040;font-size:24px}.count-down.large .hand{display:inline-block;padding:0 2px;width:32px;height:35px;line-height:35px;box-sizing:initial;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF8AAAAjCAYAAADyrNZPAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAACxMAAAsTAQCanBgAAAHRSURBVGje7doxihtBEEbhV0NHwjCgRAYfwIMDH8BsugfYK0g6gMFX2NTgA+gsmxi8NzBStKnB0cJKkfovB17JJ+ipAndHAiXva0rFCMY2mw3AO+ArcPP6ec7zC3gEvux2uyeA7XYb2TOb1dbr9Xvgh5ktzSykyN1x92fgE1Cje+ayFne/N7Pl5YvAM7r7PVCT9DS3Fne/NbMUUHe/5e/lp+hpbS2Sxiw/b0lvALL0tLaW1x0U3QL8WzNZelpbiySGYYhuAUASQJqe1tYiKc2kXS4/S09ra187gdYi6Tpx0efSkaWntbWvnUBrv/xAa187gdZ++YHWvnYCrX3yA6198gOtRRKLxSK6BYDj8QiQpqe1tdRaORwO0S0AjOMIkKantbVIYrVaRbcAcDqdANL0tLb2nR9o7U87gdZ++YHWfvmB1n75gdYiifP5HN1yDQLS9LS2FknUWqNbrkFAmp7W1j75gdbi7mkm7fJ8n6WntbVPfqA11T/c/+7tBXd/ljRGxwCY2QtQs/S0thZJD+5+Fz1tZoaZPQA1Q88cVpum6QPwXdIyCmxmDMNweT+f6J65rMXdfwIfzeybmd0Ab2fu+Q08uvvn/X7/BDBNU2TPbNY/RYn/l73uadIAAAAASUVORK5CYII=") no-repeat}.count-down.large .digital{color:#fff;font-size:28px}.count-down.large .hand-s-ext{width:59px;background-position:-36px 0}
    `],
    encapsulation: ViewEncapsulation.None
})
export class CountdownComponent implements OnChanges, OnDestroy {

    @Input() config: Config;
    @Output() start = new EventEmitter();
    @Output() finished = new EventEmitter();
    @Output() notify = new EventEmitter();
    cls: string;

    constructor(private el: ElementRef,
        private renderer: Renderer,
        private timer: Timer) {
        this.timer.start();
    }

    ngOnInit() {
        this.init();
    }

    ngOnDestroy(): void {
        this.destroy();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!changes.config.firstChange) {
            this.destroy().init();
        }
    }

    restart(): void  {
        this.destroy().init();
        this.timer.start();
    }

    private frequency: number = 1000;
    private _notify: any = {};
    private hands: Hand[] = [];
    private left: number = 0;

    private init() {
        const me = this;
        const el = me.el.nativeElement;

        me.config = Object.assign(<Config>{
            leftTime: 0,
            template: '$!h!时$!m!分$!s!秒',
            size: 'lite',
            effect: 'normal',
            varRegular: /\$\!([\-\w]+)\!/g,
            clock: ['d', 100, 2, 'h', 24, 2, 'm', 60, 2, 's', 60, 2, 'u', 10, 1]
        }, me.config);

        this.cls = `count-down ${me.config.size} ${me.config.className}`;

        // 分析markup
        let tmpl = el.innerHTML || me.config.template;
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
                content = me.html('', 's', 'handlet') +
                    me.html('.', '', 'digital') +
                    me.html('', 'u', 'handlet');
            } else {
                me.hands.push({ type: type });
            }

            return me.html(content, type, 'hand');
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

        // 构建 notify
        if (me.config.notify) {
            me.config.notify.forEach((time: number) => {
                if (time < 1) throw new Error('由于当结束会调用 finished，所以 notify 通知必须全是正整数');
                time = time * 1000;
                time = time - time % me.frequency;
                me._notify[time] = true;
            });
        }

        me.start.emit();
        me.timer.add(me.reflow, me.frequency);
        // show
        el.style.display = 'inline';

        return me;
    }

    private destroy() {
        this.timer.remove(this.reflow);
        return this;
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
            me.notify.emit(me.left);
        }

        if (me.left < 1) {
            me.finished.emit(0);
            this.destroy();
        }
    }

    /**
     * 重绘时钟
     */
    private repaint(): void {
        let me = this;
        if (me.config.repaint) {
            me.config.repaint.apply(me);
            return;
        }
        
        let content: string;

        me.hands.forEach((hand: Hand) => {
            if (hand.lastValue !== hand.value) {
                content = '';

                me.toDigitals(hand.value, hand.bits).forEach((digital: number) => {
                    content += me.html(digital.toString(), '', 'digital');
                });

                hand.node.innerHTML = content;
            }
        });
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
    private html(con: string | any[], className: string, type: string): string {
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
        return '<span class="' + className + '">' + con + '</span>';
    }

    /**
     * 把值转换为独立的数字形式
     */
    private toDigitals(value: number, bits: number): number[] {
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
