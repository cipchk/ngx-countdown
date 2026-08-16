import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Accuracy } from './accuracy';
import { Actions } from './actions';
import { Basic } from './basic';
import { CustomFormat } from './custom-format';
import { CustomFormatDate } from './custom-format-date';
import { Datefns } from './date-fns';
import { Demand } from './demand';
import { KeepingWhenRefresh } from './keeping-when-refresh';
import { MoreThan24Hours } from './more-than-24-hours';
import { Notify } from './notify';
import { OnlySeconds } from './only-seconds';
import { PrettyText } from './pretty-text';
import { Timestamp } from './timestamp';

@Component({
  selector: 'demo',
  template: `
    <div class="row">
      <div class="col-sm-4 mb-3"><demo-basic /></div>
      <div class="col-sm-4 mb-3"><demo-custom-format /></div>
      <div class="col-sm-4 mb-3"><demo-accuracy /></div>
      <div class="col-sm-4 mb-3"><demo-notify /></div>
      <div class="col-sm-4 mb-3"><demo-timestamp /></div>
      <div class="col-sm-4 mb-3"><demo-custom-format-date /></div>
      <div class="col-sm-4 mb-3"><demo-demand /></div>
      <div class="col-sm-4 mb-3"><demo-actions /></div>
      <div class="col-sm-4 mb-3"><demo-date-fns /></div>
      <div class="col-sm-4 mb-3"><demo-pretty-text /></div>
      <div class="col-sm-4 mb-3"><more-than-24-hours /></div>
      <div class="col-sm-4 mb-3"><demo-only-seconds /></div>
      <div class="col-sm-4 mb-3"><demo-keeping-when-refresh /></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Basic,
    CustomFormat,
    Accuracy,
    Notify,
    Timestamp,
    CustomFormatDate,
    Demand,
    Actions,
    Datefns,
    PrettyText,
    MoreThan24Hours,
    OnlySeconds,
    KeepingWhenRefresh
  ]
})
export class Demo {}
