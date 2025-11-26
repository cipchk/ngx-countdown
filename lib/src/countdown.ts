import {
  Component,
  OnDestroy,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  LOCALE_ID,
  TemplateRef,
  inject,
  output,
  input,
  effect,
  afterNextRender,
  signal,
} from '@angular/core';

import { CountdownConfig, CountdownStatus, CountdownEvent, CountdownEventAction, CountdownItem } from './interfaces';
import { CountdownTimer } from './timer';
import { NgTemplateOutlet, formatDate } from '@angular/common';
import { COUNTDOWN_CONFIG } from './provide';

@Component({
  selector: 'countdown',
  template: `
    @if (render()) {
      <ng-container *ngTemplateOutlet="render(); context: { $implicit: i() }" />
    } @else {
      <span [innerHTML]="i().text"></span>
    }
  `,
  host: { class: 'count-down' },
  styles: [
    `
      .count-down {
        font-variant-numeric: tabular-nums;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  providers: [CountdownTimer],
})
export class CountdownComponent implements OnDestroy {
  private readonly locale = inject(LOCALE_ID);
  private readonly timer = inject(CountdownTimer);
  private readonly defCog = inject(COUNTDOWN_CONFIG, { optional: true });

  private frequency = 1000;
  private readonly _notify: Record<number, boolean> = {};
  private status: CountdownStatus = CountdownStatus.ing;
  private isDestroy = false;
  private _config?: CountdownConfig;
  private left = 0;
  readonly i = signal<CountdownItem>({});

  readonly config = input.required({
    transform: (i: CountdownConfig) => {
      if (i.notify != null && !Array.isArray(i.notify) && i.notify > 0) {
        i.notify = [i.notify];
      }
      return i;
    }
  });
  readonly render = input<TemplateRef<{ $implicit: CountdownItem }>>();
  readonly event = output<CountdownEvent>();

  constructor() {
    afterNextRender(() => {
      this.init();
      if (!this._config?.demand) {
        this.begin();
      }
    });

    let cfgFirst = true;
    effect(() => {
      this.config();

      if (cfgFirst) {
        cfgFirst = false;
        return;
      }

      this.restart();
    })
  }

  /**
   * Start countdown, you must manually call when `demand: false`
   */
  begin(): void {
    this.status = CountdownStatus.ing;
    this.callEvent('start');
  }

  /**
   * Restart countdown
   */
  restart(): void {
    if (this.status !== CountdownStatus.stop) {
      this.destroy();
    }
    this.init();
    this.callEvent('restart');
  }

  /**
   * Stop countdown, must call `restart` when stopped, it's different from pause, unable to recover
   */
  stop(): void {
    if (this.status === CountdownStatus.stop) {
      return;
    }
    this.status = CountdownStatus.stop;
    this.destroy();
    this.callEvent('stop');
  }

  /**
   * Pause countdown, you can use `resume` to recover again
   */
  pause(): void {
    if (this.status === CountdownStatus.stop || this.status === CountdownStatus.pause) {
      return;
    }
    this.status = CountdownStatus.pause;
    this.callEvent('pause');
  }

  /**
   * Resume countdown
   */
  resume(): void {
    if (this.status === CountdownStatus.stop || this.status !== CountdownStatus.pause) {
      return;
    }
    this.status = CountdownStatus.ing;
    this.callEvent('resume');
  }

  private callEvent(action: CountdownEventAction): void {
    this.event.emit({ action, left: this.left, status: this.status, text: this.i().text! });
  }

  private init(): void {
    const config: CountdownConfig = {
      demand: false,
      leftTime: 0,
      format: 'HH:mm:ss',
      timezone: '+0000',
      formatDate: ({ date, formatStr, timezone }) => {
        return formatDate(new Date(date), formatStr, this.locale, timezone || '+0000');
      },
      ...this.defCog,
      ...this.config(),
    };
    this._config = config;
    const frq = (this.frequency = ~config.format!.indexOf('S') ? 100 : 1000);
    this.status = config.demand ? CountdownStatus.pause : CountdownStatus.ing;

    this.getLeft();

    // bind reflow to me
    const _reflow = this.reflow;
    this.reflow = (count = 0, force = false) => _reflow.apply(this, [count, force]);

    if (Array.isArray(config.notify)) {
      config.notify.forEach((time: number) => {
        if (time < 1) {
          throw new Error(`The notify config must be a positive integer.`);
        }

        time = time * 1000;
        time = time - (time % frq);
        this._notify[time] = true;
      });
    }

    this.timer.add(this.reflow, frq).start();

    this.reflow(0, true);
  }

  private destroy(): this {
    this.timer.remove(this.reflow);
    return this;
  }

  /**
   * 更新时钟
   */
  private reflow(count = 0, force = false): void {
    if (this.isDestroy || this._config == null) {
      return;
    }

    const { status, _notify } = this;
    if (!force && status !== CountdownStatus.ing) {
      return;
    }

    let value = (this.left = this.left - this.frequency * count);
    if (value < 1) {
      value = 0;
    }
    const { formatDate, format, timezone, prettyText, notify } = this._config;
    const item: CountdownItem = {
      value,
      text: formatDate!({ date: value, formatStr: format!, timezone: timezone }),
    };
    if (typeof prettyText === 'function') {
      item.text = prettyText(item.text!);
    }
    this.i.set(item);

    if (notify === 0 || _notify[value]) {
      this.callEvent('notify');
    }

    if (value === 0) {
      this.status = CountdownStatus.done;
      this.destroy();
      this.callEvent('done');
    }
  }

  /**
   * 获取倒计时剩余帧数
   */
  private getLeft(): void {
    const { frequency } = this;
    const { leftTime, stopTime } = this._config!;
    let left = leftTime! * 1000;
    const end = stopTime;

    if (!left && end) {
      left = end - new Date().getTime();
    }

    this.left = left - (left % frequency);
  }

  ngOnDestroy(): void {
    this.isDestroy = true;
    this.destroy();
  }
}
