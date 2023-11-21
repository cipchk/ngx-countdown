import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';
import type { CountdownConfig } from './interfaces';

export const COUNTDOWN_CONFIG = new InjectionToken<CountdownConfig>('COUNTDOWN_CONFIG');

export function provideCountdown(config?: CountdownConfig): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: COUNTDOWN_CONFIG, useValue: config }]);
}
