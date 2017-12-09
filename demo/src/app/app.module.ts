import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';
import { NotifyModule } from 'ngx-notify';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { CountdownModule } from '../../../src/index';

import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout.component';
import { DemoComponent } from './components/demo.component';
import { ALotComponent } from './components/alot.component';
import { TplComponent } from './components/tpl.component';
import { NothingComponent } from './components/nothing.component';
import { TplFlipComponent } from './tpl/flip/flip.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        CommonModule,
        HighlightJsModule,
        TabsModule.forRoot(),
        NotifyModule.forRoot({
            notify: {
                theme: 'bootstrap',
                progress: false
            }
        }),
        RouterModule.forRoot([
            {
                path: '',
                component: LayoutComponent,
                children: [
                    { path: '', component: DemoComponent },
                    { path: 'alot', component: ALotComponent },
                    { path: 'tpl', component: TplComponent },
                    { path: 'nothing', component: NothingComponent }
                ]
            },
            {
                path: 'tpl',
                children: [
                    { path: 'flip', component: TplFlipComponent }
                ]
            }
        ], { useHash: true }),
        CountdownModule
    ],
    declarations: [
        AppComponent,
        LayoutComponent,
        DemoComponent,
        ALotComponent,
        NothingComponent,
        TplComponent,
        TplFlipComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppDemoModule {
}
