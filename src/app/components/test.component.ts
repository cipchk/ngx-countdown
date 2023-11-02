import { Component } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';

@Component({
  selector: 'test',
  template: `<countdown [config]="{ leftTime: 86403, format: 'D 天 H 时 m 分 s 秒 S' }" />`,
  standalone: true,
  imports: [CountdownComponent],
})
export class TestComponent {}
