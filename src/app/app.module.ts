import { TestComponent } from './components/test.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';

import { CountdownModule, CountdownGlobalConfig, CountdownConfig } from 'ngx-countdown';

import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout.component';
import { DemoComponent } from './components/demo.component';
import { ALotComponent } from './components/alot.component';
import { NothingComponent } from './components/nothing.component';

export function countdownConfigFactory(): CountdownConfig {
  return {};
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HighlightJsModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: LayoutComponent,
          children: [
            { path: '', component: DemoComponent },
            { path: 'alot', component: ALotComponent },
            { path: 'nothing', component: NothingComponent },
          ],
        },
        {
          path: 'test',
          component: TestComponent,
        }
      ],
      { useHash: true },
    ),
    CountdownModule,
  ],
  declarations: [AppComponent, LayoutComponent, DemoComponent, ALotComponent, NothingComponent, TestComponent],
  providers: [{ provide: CountdownGlobalConfig, useFactory: countdownConfigFactory }],
  bootstrap: [AppComponent],
})
export class AppDemoModule { }
