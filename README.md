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

import `GesturePasswordModule` 

```typescript
import { GesturePasswordModule } from 'ngx-countdown';

@NgModule({
    imports: [ BrowserModule, GesturePasswordModule ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

### 2、Template

```html
<gesture-password style="height: 350px;"
        [(ngModel)]="pwd" [type]="type" [options]="options"
        (error)="onError($event)"
        (checked)="onChecked($event)"
        (beforeRepeat)="onBeforeRepeat($event)"
        (afterRepeat)="onAfterRepeat($event)"></gesture-password>
```

| Name    | Type           | Default  | Summary |
| ------- | ------------- | ----- | ----- |
| type | 'check','recorder' | 'check' | **check** 检查手势密码，**recorder** 设置手势密码 |
| options | Options |  | 配置项 |
| error | Function(res: Result) |  |  |
| checked | Function(res: Result) |  | 当 type==='check' 时每一次绘制完成后触发 |
| beforeRepeat | Function(res: Result) |  | 当 type==='recorder' 时第一次绘制完成后触发 |
| afterRepeat | Function(res: Result) |  | 当 type==='recorder' 时第二次绘制完成后触发 |

## Options

| Name    | Type           | Default  | Summary |
| ------- | ------------- | ----- | ----- |
| num | number | 3 | 圆点的数量 |
| focusColor | string | #e06555 | 当前选中的圆的颜色 |
| fgColor | string | #d6dae5 | 未选中的圆的颜色 |
| bgColor | string | #fff | 背景颜色 |
| innerRadius | number | 20 | 圆点的内半径 |
| outerRadius | number | 50 | 圆点的外半径，focus 的时候显示 |
| touchRadius | number | 70 | 判定touch事件的圆半径 |
| render | boolean | true | 自动渲染 |
| min | number | 3 | 最小允许的点数 |
| passwords | string[] |  | 密码编码，数量必须是 num*num，否则会产生Error；默认值：`[ '1', '2', '3', '4', '5', '6', '7', '8', '9']` |

## Enum `ERR`

+ **SUCCESS、null、undefined** 密码属于有效值。
+ **NOT_ENOUGH_POINTS** 不足最少节点
+ **PASSWORD_MISMATCH** 密码不匹配
+ **USER_CANCELED** 用户主动取消

## Result

| Name    | Type           | Default  | Summary |
| ------- | ------------- | ----- | ----- |
| err | ERR |  | 错误状态，见 enum `ERR` |
| result | string | | 根据密码编码解析后的真实密码值 |
| records | Array | | 路径数据，只有成功状态才会返回 |

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/cipchk/ngx-countdown/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/cipchk/ngx-countdown/blob/master/LICENSE) file for the full text)
