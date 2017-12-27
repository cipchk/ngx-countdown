import { Component, ElementRef, ViewEncapsulation, Input, Renderer, OnChanges, SimpleChanges, OnDestroy, Output, EventEmitter, HostBinding, OnInit } from '@angular/core';
import { Config } from './interfaces/config';
import { Hand } from './interfaces/hand';
import { Timer } from './timer';

@Component({
    selector: 'countdown',
    template: `<ng-content></ng-content>`,
    styleUrls: [ './component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class CountdownComponent implements OnInit, OnChanges, OnDestroy {

    private frequency = 1000;
    private _notify: any = {};
    private hands: Hand[] = [];
    private left = 0;
    private parsed = false;
    private stoped = false;

    @Input() config: Config;
    @Output() start = new EventEmitter();
    @Output() finished = new EventEmitter();
    @Output() notify = new EventEmitter();
    @Output() event = new EventEmitter<{ action: string, left: number }>();

    @HostBinding('class')
    cls: string;

    constructor(private el: ElementRef,
        private renderer: Renderer,
        private timer: Timer) {
        this.timer.start();
    }

    ngOnInit() {
        this.init();
        this.callEvent('start');
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
        if (!this.stoped) this.destroy();
        this.init();
        this.timer.start();
        this.callEvent('restart');
    }

    stop() {
        if (this.stoped) return;
        this.stoped = true;
        this.destroy();
        this.callEvent('stop');
    }

    pause() {
        if (this.stoped || this.parsed) return ;
        this.parsed = true;
        this.callEvent('pause');
    }

    resume() {
        if (this.stoped || !this.parsed) return ;
        this.parsed = false;
        this.callEvent('resume');
    }

    private callEvent(action: string) {
        this.event.emit({ action, left: this.left });
    }

    private init() {
        const me = this;
        const el = me.el.nativeElement;
        me.parsed = false;
        me.stoped = false;

        me.config = Object.assign(<Config>{
            leftTime: 0,
            template: '$!h!时$!m!分$!s!秒',
            size: 'lite',
            effect: 'normal',
            varRegular: /\$\!([\-\w]+)\!/g,
            clock: ['d', 100, 2, 'h', 24, 2, 'm', 60, 2, 's', 60, 2, 'u', 10, 1]
        }, me.config);

        this.cls = `count-down ${me.config.size} ${me.config.className || ''}`;

        // 分析markup
        const tmpl = el.innerHTML || me.config.template;
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
            const type = hand.type;
            let base = 100,
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
        if (this.parsed || this.stoped) return ;
        const me = this;
        me.left = me.left - me.frequency * count;

        me.hands.forEach((hand: Hand) => {
            hand.lastValue = hand.value;
            hand.value = Math.floor(me.left / hand.base) % hand.radix;
        });

        me.repaint();

        if (me._notify[me.left]) {
            me.notify.emit(me.left);
            this.callEvent('notify');
        }

        if (me.left < 1) {
            me.finished.emit(0);
            this.stoped = true;
            this.callEvent('finished');
            this.destroy();
        }
    }

    /**
     * 重绘时钟
     */
    private repaint(): void {
        const me = this;
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
        let left: number = this.config.leftTime * 1000;
        const end: number = this.config.stopTime;

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
        const digitals = [];
        // 把时、分、秒等换算成数字.
        while (bits--) {
            digitals[bits] = value % 10;
            value = Math.floor(value / 10);
        }
        return digitals;
    }

}
