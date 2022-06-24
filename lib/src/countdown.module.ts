import { NgModule } from '@angular/core';

import { CountdownComponent } from './countdown.component';

@NgModule({
  imports: [CountdownComponent],
  exports: [CountdownComponent],
})
export class CountdownModule {}
