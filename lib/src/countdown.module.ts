import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CountdownComponent } from './countdown.component';
import { Timer } from './countdown.timer';

@NgModule({
    imports:        [CommonModule],
    providers:      [Timer],
    declarations:   [CountdownComponent],
    exports:        [CountdownComponent]
})
export class CountdownModule {
}
