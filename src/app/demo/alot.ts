import { Component } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';

@Component({
  selector: 'demo-alot',
  template: `<div class="row">
    @for(i of arr; track i) {
    <div class="col-sm-2">
      <countdown [config]="{ leftTime: 30 }" />
    </div>
    }
  </div> `,
  imports: [CountdownComponent],
})
export class ALot {
  protected arr = new Array(1000).fill({});
}
