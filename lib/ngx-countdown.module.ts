import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CountdownComponent } from './components/component';
import { Timer } from './components/timer';

// region：export

export { Config } from './components/interfaces/config';
export { CountdownComponent } from './components/component';

// endregion

@NgModule({
    imports:        [CommonModule],
    providers:      [Timer],
    declarations:   [CountdownComponent],
    exports:        [CountdownComponent]
})
export class CountdownModule {
}
