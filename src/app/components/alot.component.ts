import { NgFor } from '@angular/common';
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
  standalone: true,
  imports: [NgFor, CountdownComponent],
})
export class ALotComponent {
  arr = new Array(1000).fill({});
}
