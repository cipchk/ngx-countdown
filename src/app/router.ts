import { Route } from '@angular/router';
import { LayoutComponent } from './components/layout.component';
import { DemoComponent } from './components/demo.component';
import { ALotComponent } from './components/alot.component';
import { NothingComponent } from './components/nothing.component';
import { TestComponent } from './components/test.component';

export const ROUTERS: Route[] = [
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
  },
];
