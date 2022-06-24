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
import { OnlySecondsComponent } from './components/only-seconds.component';
import { ViewCodeComponent } from './components/view-code.component';
import { MoreThan24HoursComponent } from './components/more-than-24-hours.component';
import { DatefnsComponent } from './components/date-fns.component';
import { PrettyTextComponent } from './components/pretty-text.component';
import { ActionsComponent } from './components/actions.component';
import { DemandComponent } from './components/demand.component';
import { CustomFormatDateComponent } from './components/custom-format-date.component';
import { TimestampComponent } from './components/timestamp.component';
import { NotifyComponent } from './components/notify.component';
import { AccuracyComponent } from './components/accuracy.component';
import { CustomFormatComponent } from './components/custom-format.component';
import { BasicComponent } from './components/basic.component';
import { KeepingWhenRefreshComponent } from './components/keeping-when-refresh.component';
import { StandaloneComponent } from './standalone.component';

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
            { path: 'standalone', component: StandaloneComponent },
          ],
        },
        {
          path: 'test',
          component: TestComponent,
        },
      ],
      { useHash: true, relativeLinkResolution: 'legacy' },
    ),
    CountdownModule,
  ],
  declarations: [
    AppComponent,
    LayoutComponent,
    DemoComponent,
    ALotComponent,
    NothingComponent,
    TestComponent,
    ViewCodeComponent,
    BasicComponent,
    CustomFormatComponent,
    AccuracyComponent,
    NotifyComponent,
    TimestampComponent,
    CustomFormatDateComponent,
    DemandComponent,
    ActionsComponent,
    PrettyTextComponent,
    DatefnsComponent,
    MoreThan24HoursComponent,
    OnlySecondsComponent,
    KeepingWhenRefreshComponent,
  ],
  providers: [{ provide: CountdownGlobalConfig, useFactory: countdownConfigFactory }],
  bootstrap: [AppComponent],
})
export class AppDemoModule {}
