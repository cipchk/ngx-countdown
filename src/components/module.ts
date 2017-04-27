import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CountdownComponent } from './component';
import { Timer } from './timer';
import { Effect } from './effect';

@NgModule({
  imports: [ CommonModule ],
  providers: [ Timer, Effect ],
  declarations: [ CountdownComponent ],
  exports: [ CountdownComponent ]
})
export class CountdownModule {
}
