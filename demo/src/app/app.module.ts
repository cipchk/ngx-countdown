import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';
import { NotifyModule } from 'ngx-notify';

import { CountdownModule } from 'ngx-countdown';

import { AppComponent } from './app.component';
import { DemoComponent } from './components/demo.component';
import { OtherComponent } from './components/other.component';
import { NothingComponent } from './components/nothing.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    HighlightJsModule,
    NotifyModule.forRoot({
        notify: {
            theme: 'bootstrap',
            progress: false
        }
    }),
    RouterModule.forRoot([
        { path: '', component: DemoComponent },
        { path: 'other', component: OtherComponent },
        { path: 'nothing', component: NothingComponent }
    ], { useHash: true }),
    CountdownModule
  ],
  declarations: [
    AppComponent,
    DemoComponent,
    OtherComponent,
    NothingComponent
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})

export class AppDemoModule {
}
