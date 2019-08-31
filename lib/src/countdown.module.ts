import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CountdownComponent } from './countdown.component';
import { CountdownTimer } from './countdown.timer';

@NgModule({
  imports: [CommonModule],
  providers: [CountdownTimer],
  declarations: [CountdownComponent],
  exports: [CountdownComponent],
})
export class CountdownModule {}
