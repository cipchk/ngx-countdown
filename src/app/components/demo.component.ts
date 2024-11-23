import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BasicComponent } from './basic.component';
import { CustomFormatComponent } from './custom-format.component';
import { AccuracyComponent } from './accuracy.component';
import { NotifyComponent } from './notify.component';
import { TimestampComponent } from './timestamp.component';
import { CustomFormatDateComponent } from './custom-format-date.component';
import { DemandComponent } from './demand.component';
import { ActionsComponent } from './actions.component';
import { DatefnsComponent } from './date-fns.component';
import { PrettyTextComponent } from './pretty-text.component';
import { MoreThan24HoursComponent } from './more-than-24-hours.component';
import { OnlySecondsComponent } from './only-seconds.component';
import { KeepingWhenRefreshComponent } from './keeping-when-refresh.component';

@Component({
  selector: 'demo',
  template: `<div class="row">
    <div class="col-sm-4 mb-3"><demo-basic></demo-basic></div>
    <div class="col-sm-4 mb-3"><demo-custom-format></demo-custom-format></div>
    <div class="col-sm-4 mb-3"><demo-accuracy></demo-accuracy></div>
    <div class="col-sm-4 mb-3"><demo-notify></demo-notify></div>
    <div class="col-sm-4 mb-3"><demo-timestamp></demo-timestamp></div>
    <div class="col-sm-4 mb-3"><demo-custom-format-date></demo-custom-format-date></div>
    <div class="col-sm-4 mb-3"><demo-demand></demo-demand></div>
    <div class="col-sm-4 mb-3"><demo-actions></demo-actions></div>
    <div class="col-sm-4 mb-3"><demo-date-fns></demo-date-fns></div>
    <div class="col-sm-4 mb-3"><demo-pretty-text></demo-pretty-text></div>
    <div class="col-sm-4 mb-3"><more-than-24-hours></more-than-24-hours></div>
    <div class="col-sm-4 mb-3"><demo-only-seconds></demo-only-seconds></div>
    <div class="col-sm-4 mb-3"><demo-keeping-when-refresh></demo-keeping-when-refresh></div>
  </div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BasicComponent,
    CustomFormatComponent,
    AccuracyComponent,
    NotifyComponent,
    TimestampComponent,
    CustomFormatDateComponent,
    DemandComponent,
    ActionsComponent,
    DatefnsComponent,
    PrettyTextComponent,
    MoreThan24HoursComponent,
    OnlySecondsComponent,
    KeepingWhenRefreshComponent,
  ],
})
export class DemoComponent {}
