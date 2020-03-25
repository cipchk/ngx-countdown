import { Component } from '@angular/core';

@Component({
  selector: 'test',
  template: `
    <countdown [config]="{ leftTime: 86403, format: 'D 天 H 时 m 分 s 秒 S' }"></countdown>
  `,
})
export class TestComponent {}
