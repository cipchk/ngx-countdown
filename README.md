# ngx-countdown
Simple, easy and performance countdown for angular

[![NPM version](https://img.shields.io/npm/v/ngx-countdown.svg)](https://www.npmjs.com/package/ngx-countdown)
[![Build Status](https://travis-ci.org/cipchk/ngx-countdown.svg?branch=master)](https://travis-ci.org/cipchk/ngx-countdown)

## Demo

[Live Demo](https://cipchk.github.io/ngx-countdown/)

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
| config | Config |  | 配置信息，见Config |
| start | Function |  | 开始时触发 |
| finished | onFinished |  |结束时触发 |
| notify | Function(time: number) |  | 通知时触发，需要在 Config 中配置 notify |

**如何重置计数器**

```typescript
@ViewChild(CountdownComponent) counter: CountdownComponent;
resetTimer(){
    //this.counter.config.leftTime = 5;
    this.counter.restart();
}
```

当然，也可以通过重新赋值 `config` 参数，也能达到一样的效果。

## Config

| Name    | Type           | Default  | Summary |
| ------- | ------------- | ----- | ----- |
| template | string | $!h!时$!m!分$!s!秒 | 自定义模板，如果为空以组件 innerHTML 为准，再不然使用默认值。`$!s!` 有另一种表示法 `$!s-ext!` 表示0.1s精度。  |
| size | string | lite | lite、medium、large 三种不同风格，见DEMO |
| leftTime | number | 0 | 剩余时间：指的是根据服务端计算剩余时间值进行倒计时，支持0.1s精度，但有可能会出现丢帧的情况。（单位：秒） |
| stopTime | number | 0 | 结束时间：指的是根据本地时间至结束时间进行倒计时。（单位：UNIX时间戳 ms） |
| varRegular | RegExp | `/\$\{([\-\w]+)\}/g` | 模板解析正则表达式，有时候由于模板结构比较特殊，无法根据默认的表达式进行解析，那就需要修改它。 |
| clock | Array |  | 时钟控制数组，特殊需求时可以修改，里面是三元组：指针名、进制、位数，可参考大于99小时demo |
| notify | number[] |  | 第xx秒时调用 notify 函数，值必须是**正整数** |
| className | string |  | 自定义类名 |
| repaint | Function |  | 自定义重绘 |

## 关于重绘

重绘是指当Timer一次跳动时会执行一次（如果是0.1s精度的，会更频繁）；因此，可以制定一些不一样的效果。有关细节可以参考 [Flip](https://cipchk.github.io/ngx-countdown/#/tpl/flip)。

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/cipchk/ngx-countdown/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/cipchk/ngx-countdown/blob/master/LICENSE) file for the full text)
