import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'view-code',
  template: `
    (<a href="https://github.com/cipchk/ngx-countdown/blob/master/src/app/demo/{{ name() }}.ts" target="_blank">View Code</a
    >)
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCode {
  readonly name = input('');
}
