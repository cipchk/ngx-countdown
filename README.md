# ngx-countdown

Simple, easy and performance countdown for angular

[![NPM version](https://img.shields.io/npm/v/ngx-countdown.svg)](https://www.npmjs.com/package/ngx-countdown)
[![Ci](https://github.com/cipchk/ngx-countdown/workflows/Ci/badge.svg)](https://github.com/cipchk/ngx-countdown/actions?query=workflow%3ACi)

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
<countdown #cd [config]="config" (event)="handleEvent($event)"></countdown>
```

**Method**

| Name | Description |
|------|-------------|
| `begin()` | Start countdown, you must manually call when `demand: false` |
| `restart()` | Restart countdown |
| `stop()` | Stop countdown, must call `restart` when stopped, it's different from pause, unable to recover |
| `pause()` | Pause countdown, you can use `resume` to recover again |
| `resume()` | Resume countdown |

**How call component methods**

```ts
@ViewChild('cd', { static: false }) private countdown: CountdownComponent;
this.countdown.begin();
```

## API

### countdown

| Name | Type | Default | Summary |
|------|------|---------|---------|
| `config` | `CountdownConfig` | - | Config |
| `event` | `EventEmitter<CountdownEvent>` | - | Events |

### CountdownConfig

| Name | Type | Default | Summary |
|------|------|---------|---------|
| demand | `boolean` | `false` | Start the counter on demand, must call `begin()` to starting |
| leftTime | `number` | `0` | Calculate the remaining time based on the server, e.g: `10`,`5.5`, (Unit: seconds) |
| stopTime | `number` | - | Refers to counting down from local time to end time (Unit: Milliseconds second UNIX timestamp) |
| format | `string` | `HH:mm:ss` | Formats a date value, pls refer to [Accepted patterns](https://angular.io/api/common/DatePipe#usage-notes) |
| prettyText | `(text: string) => string` | - | Beautify text, generally used to convert formatted time text into HTML |
| notify | `number[], number` | - | Should be trigger type `notify` event on the x second. When values is `0` will be trigger every time |
| formatDate | `CountdownFormatFn` | - | Default based on the implementation of `formatDate` in `@angular/common`, You can changed to other libs, e.g: [date-fns](https://date-fns.org/v2.0.1/docs/format) |
| timezone | `string` | `+0000` | A timezone offset (such as '+0430'), or a standard UTC/GMT. When not supplied, uses the end-user's local system timezone |

### CountdownEvent

| Name | Type | Summary |
|------|------|---------|
| `action` | `start,stop,restart,pause,resume,notify,done` | Action of the event |
| `status` | `CountdownStatus` | Status of the countdown |
| `left` | `number` | Number of remaining milliseconds |
| `text` | `string` | Format the text |

**Global Config**

```ts
function countdownConfigFactory(): CountdownGlobalConfig {
  return { format: `mm:ss` };
}

@NgModule({
  imports: [ CountdownModule ],
  providers: [
    { provide: CountdownGlobalConfig, useFactory: countdownConfigFactory }
  ],
})
export class AppDemoModule {}
```

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/cipchk/ngx-countdown/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/cipchk/ngx-countdown/blob/master/LICENSE) file for the full text)
