import { Component } from '@angular/core';

@Component({
  selector: 'demo-alot',
  templateUrl: './alot.component.html',
})
export class ALotComponent {
  arr = new Array(1000).fill({});
}
