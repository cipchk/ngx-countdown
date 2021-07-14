import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'view-code',
  template: `
    (<a href="https://github.com/cipchk/ngx-countdown/blob/master/src/app/components/{{ name }}.component.ts" target="_blank">View Code</a>)
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCodeComponent {
  @Input() name = '';
}
