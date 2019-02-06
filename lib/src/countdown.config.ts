import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CountdownConfig {
  demand = false;
  leftTime = 0;
  template = '$!h!时$!m!分$!s!秒';
  effect = 'normal';
  varRegular?: RegExp = /\$\!([\-\w]+)\!/g;
  clock?: any[] = ['d', 100, 2, 'h', 24, 2, 'm', 60, 2, 's', 60, 2, 'u', 10, 1];
}
