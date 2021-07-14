import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-basic',
  template: `
    <div class="card-header">
      Basic
      <view-code name="basic"></view-code>
    </div>
    <div class="card-body">
      <countdown [config]="{ leftTime: 30 }"></countdown>
    </div>
  `,
  host: {
    '[class.card]': `true`,
    '[class.text-center]': `true`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicComponent {}
