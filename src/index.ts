import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CountdownComponent } from './components/component';
import { Timer } from './components/timer';

export { Config } from './components/interfaces/config';
export { CountdownComponent } from './components/component';

@NgModule({
  imports: [ CommonModule ],
  providers: [ Timer ],
  declarations: [ CountdownComponent ],
  exports: [ CountdownComponent ]
})
export class CountdownModule {
}
