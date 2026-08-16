import { Route } from '@angular/router';

import { ALot } from './demo/alot';
import { Demo } from './demo/demo';
import { Layout } from './demo/layout';
import { Nothing } from './demo/nothing';
import { Test } from './demo/test';

export const ROUTERS: Route[] = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: Demo },
      { path: 'alot', component: ALot },
      { path: 'nothing', component: Nothing }
    ]
  },
  {
    path: 'test',
    component: Test
  }
];
