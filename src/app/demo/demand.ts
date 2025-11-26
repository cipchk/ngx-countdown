import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
import { ViewCode } from './view-code';

@Component({
  selector: 'demo-demand',
  template: `
    <div class="card-header">
      Demand
      <view-code name="demand" />
    </div>
    <div class="card-body">
      <countdown #cd [config]="{ leftTime: 30, demand: true }" />
      <div>
        <button (click)="cd.begin()" class="btn btn-link btn-sm">begin</button>
      </div>
    </div>
  `,
  host: {
    class: 'card text-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CountdownComponent, ViewCode],
})
export class Demand { }
