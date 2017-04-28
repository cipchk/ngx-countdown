import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CountdownComponent } from './component';
import { Timer } from './timer';

@NgModule({
  imports: [ CommonModule ],
  providers: [ Timer ],
  declarations: [ CountdownComponent ],
  exports: [ CountdownComponent ]
})
export class CountdownModule {
}
