import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
import { ViewCodeComponent } from './view-code.component';

@Component({
  selector: 'demo-alot',
  template: `<div class="row">
    <div class="col-sm-2" *ngFor="let i of arr">
      <countdown [config]="{ leftTime: 30 }"></countdown>
    </div>
  </div> `,
  standalone: true,
  imports: [NgFor, CountdownComponent, ViewCodeComponent],
})
export class ALotComponent {
  arr = new Array(1000).fill({});
}
