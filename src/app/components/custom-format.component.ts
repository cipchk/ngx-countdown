import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-custom-format',
  template: `
    <div class="card-header">
      Custom format
      <view-code name="custom-format"></view-code>
    </div>
    <div class="card-body">
      <countdown [config]="{ leftTime: 100, format: 'm:s' }"></countdown>
    </div>
  `,
  host: {
    '[class.card]': `true`,
    '[class.text-center]': `true`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomFormatComponent {}
