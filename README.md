# ngx-countdown

Simple, easy and performance countdown for angular

[![NPM version](https://img.shields.io/npm/v/ngx-countdown.svg)](https://www.npmjs.com/package/ngx-countdown)
[![Build Status](https://travis-ci.org/cipchk/ngx-countdown.svg?branch=master)](https://travis-ci.org/cipchk/ngx-countdown)
[![codecov](https://codecov.io/gh/cipchk/ngx-countdown/branch/master/graph/badge.svg)](https://codecov.io/gh/cipchk/ngx-countdown)

## Demo

- [Live Demo](https://cipchk.github.io/ngx-countdown/)
- [Stackblitz](https://stackblitz.com/edit/ngx-countdown-setup)

## Usage

### 1. Install

```
npm install ngx-countdown --save
```

import `CountdownModule`。

```typescript
import { CountdownModule } from 'ngx-countdown';

@NgModule({
    imports: [ BrowserModule, CountdownModule ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

### 2、Template

```html
<countdown [config]="config"
    (start)="onStart()"
    (finished)="onFinished()"
    (notify)="onNotify($event)"></countdown>
```

| Name    | Type           | Default  | Summary |
| ------- | ------------- | ----- | ----- |
| `config` | Config | - | see Config |
| `begin()` | - | - | Triggers when `{demand: false}` |
| `restart()` | - | - | - |
| `stop()` | - | - | - |
| `pause()` | - | - | - |
| `resume()` | - | - | - |
| `start` | `EventEmitter` | - | Triggers when start |
| `finished` | `EventEmitter` | - | Triggers when finished |
| `notify` | `EventEmitter(time: number)` | - | Triggers when notify, need setting `config.notify` values |
| `event` | `EventEmitter<{ action: string, left: number }>` | - | Catch all event |

**How call component methods**

```typescript
@ViewChild(CountdownComponent) counter: CountdownComponent;
resetTimer(){
    this.counter.restart();
    this.counter.stop();
    this.counter.pause();
    this.counter.resume();
}
```

## Config

| Name    | Type           | Default  | Summary |
| ------- | ------------- | ----- | ----- |
| demand | boolean | `false` | start the counter on demand, must call `begin()` to starting  |
| template | string | `$!h!时$!m!分$!s!秒` | Custom render template, if is empty use the `<ng-content>` content, and `$!s-ext!` it's `0.1s` accuracy |
| leftTime | number | 0 | Calculate the remaining time based on the server, e.g: `10`,`5.5`(May be dropped frames) (Unit: seconds) |
| stopTime | number | 0 | 结束时间：指的是根据本地时间至结束时间进行倒计时。（单位：UNIX时间戳 ms） |
| varRegular | RegExp | `/\$\{([\-\w]+)\}/g` | 模板解析正则表达式，有时候由于模板结构比较特殊，无法根据默认的表达式进行解析，那就需要修改它。 |
| clock | Array |  | 时钟控制数组，特殊需求时可以修改，里面是三元组：指针名、进制、位数，可参考大于99小时demo |
| notify | number[] |  | 第xx秒时调用 notify 函数，值必须是**正整数** |
| repaint | Function |  | Custom repaintes |

**Global Config**

```ts
function countdownConfigFactory(): Config {
  return { template: `$!h!:$!m!:$!s!` };
}

@NgModule({
  imports: [ CountdownModule ],
  providers: [
    { provide: CountdownConfig, useFactory: countdownConfigFactory }
  ],
})
export class AppDemoModule {}
```

## About repaints

The timer will call repaint function every time, if it's `0.1s` accuracy, it will be more frequent. so you can make same special effects, like [Flip](https://cipchk.github.io/ngx-countdown/#/tpl/flip).

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/cipchk/ngx-countdown/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/cipchk/ngx-countdown/blob/master/LICENSE) file for the full text)
