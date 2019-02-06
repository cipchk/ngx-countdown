import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';
import { ToastrModule } from 'ngx-toastr';

import { CountdownModule, Config } from 'ngx-countdown';

import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout.component';
import { DemoComponent } from './components/demo.component';
import { ALotComponent } from './components/alot.component';
import { TplComponent } from './components/tpl.component';
import { NothingComponent } from './components/nothing.component';
import { TplFlipComponent } from './tpl/flip/flip.component';
import { CountdownConfig } from 'ngx-countdown/src/countdown.config';

export function countdownConfigFactory(): Config {
  return { template: `$!h!:$!m!:$!s!` };
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HighlightJsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(
      [
        {
          path: '',
          component: LayoutComponent,
          children: [
            { path: '', component: DemoComponent },
            { path: 'alot', component: ALotComponent },
            { path: 'tpl', component: TplComponent },
            { path: 'nothing', component: NothingComponent },
          ],
        },
        {
          path: 'tpl',
          children: [{ path: 'flip', component: TplFlipComponent }],
        },
      ],
      { useHash: true },
    ),
    CountdownModule,
  ],
  declarations: [
    AppComponent,
    LayoutComponent,
    DemoComponent,
    ALotComponent,
    NothingComponent,
    TplComponent,
    TplFlipComponent,
  ],
  providers: [
    { provide: CountdownConfig, useFactory: countdownConfigFactory }
  ],
  bootstrap: [AppComponent],
})
export class AppDemoModule {}
