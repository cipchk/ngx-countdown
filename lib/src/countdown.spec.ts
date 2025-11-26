import { Component, DebugElement, provideZonelessChangeDetection, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownConfig, CountdownEvent, CountdownStatus } from './interfaces';
import { CountdownComponent } from './countdown';
import { Mock } from 'vitest';

describe('Component: ngx-countdown', () => {
  let fixture: ComponentFixture<TestNGComponent>;
  let context: TestNGComponent;
  let dl: DebugElement;
  let spy: Mock<(_: CountdownEvent) => void>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [TestNGComponent],
    });
    fixture = TestBed.createComponent(TestNGComponent);
    vi.useFakeTimers();
    await fixture.whenStable();
    context = fixture.componentInstance;
    dl = fixture.debugElement;
    spy = vi.spyOn(context, 'handleEvent');
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
    context.comp()?.ngOnDestroy();
  });

  function getSecond(): number {
    return context.comp()!.i().value! / 1000;
  }

  describe('[default]', () => {
    it('should notify in 1s', () => {
      context.config.set({ leftTime: 2, notify: [1] });
      vi.advanceTimersByTime(1001);
      expect(spy.mock.lastCall?.[0].action).toBe('notify');
    });
    it('should notify is greater than 0', () => {
      context.config.set({ leftTime: 2, notify: 1 });
      vi.advanceTimersByTime(1001);
      expect(spy.mock.lastCall?.[0].action).toBe('notify');
    });
    it('should be throw error when notify is not positive integer', () => {
      expect(() => {
        context.config.set({ leftTime: 2, notify: [0.1] });
        vi.advanceTimersByTime(1);
      }).toThrow();
    });
    it('should be demand start', () => {
      context.config.set({ demand: true, leftTime: 1 });
      expect(context.handleEvent).not.toHaveBeenCalled();
      context.comp()?.begin();
      expect(spy.mock.lastCall?.[0].status).toBe(CountdownStatus.ing);
      fixture.detectChanges();
      expect((dl.nativeElement as HTMLElement).textContent?.trim()).toBe(`00:00:01`);
    });
    it('should be re-init when reassigning config value', () => {
      context.config.set({ leftTime: 2 });
      fixture.detectChanges();
      expect(getSecond()).toBe(2);
      context.config.set({ leftTime: 3 });
      fixture.detectChanges();
      expect(getSecond()).toBe(3);
    });
    it('should be custom format', () => {
      context.config.set({ leftTime: 2, format: 'm' });
      vi.advanceTimersByTime(250);
      expect(context.comp()?.i().text).toBe(`0`);
    });
    it('Support fractional seconds', () => {
      context.config.set({ leftTime: 2, format: 'S' });
      vi.advanceTimersByTime(250);
      expect(context.comp()?.i().value).toBeGreaterThan(1001);
    });
    it('Pretty text', () => {
      const fn = vi.fn(() => '');
      context.config.set({ leftTime: 2, prettyText: fn });
      vi.advanceTimersByTime(1);
      expect(fn).toHaveBeenCalled();
    });
    describe('#stopTime', () => {
      it('should be working', () => {
        context.config.set({ stopTime: new Date().getTime() + 1000 * 2 });
        vi.advanceTimersByTime(1001);
        expect((context.comp() as any).left).toBe(1000);
      });
    });
  });

  describe('[actions]', () => {
    it('#begin', () => {
      context.config.set({ demand: true, leftTime: 1 });
      expect(context.handleEvent).not.toHaveBeenCalled();
      context.comp()?.begin();
      expect(spy.mock.lastCall?.[0].status).toBe(CountdownStatus.ing);
    });
    describe('#restart', () => {
      it('normal', () => {
        context.config.set({ leftTime: 2 });
        fixture.detectChanges();
        expect(getSecond()).toBe(2);
        vi.advanceTimersByTime(1000);
        expect(getSecond()).toBe(1);
        context.comp()?.restart();
        expect(getSecond()).toBe(2);
      });
      it('when stoped', () => {
        context.config.set({ leftTime: 2 });
        fixture.detectChanges();
        expect(getSecond()).toBe(2);
        context.comp()?.stop();
        fixture.detectChanges();
        vi.advanceTimersByTime(1001);
        expect(getSecond()).toBe(2);
        context.comp()?.restart();
        fixture.detectChanges();
        expect(getSecond()).toBe(2);
      });
    });
    describe('#stop', () => {
      it('normal', () => {
        context.config.set({ leftTime: 2 });
        fixture.detectChanges();
        expect(getSecond()).toBe(2);
        vi.advanceTimersByTime(1000);
        expect(getSecond()).toBe(1);
        context.comp()?.stop();
        fixture.detectChanges();
        vi.advanceTimersByTime(1000);
        expect(getSecond()).toBe(1);
      });
      it('when stoped', () => {
        context.config.set({ leftTime: 2 });
        fixture.detectChanges();
        expect(getSecond()).toBe(2);
        context.comp()?.stop();
        fixture.detectChanges();
        vi.advanceTimersByTime(1001);
        expect(getSecond()).toBe(2);
        context.comp()?.stop();
        fixture.detectChanges();
        vi.advanceTimersByTime(1000);
        expect(getSecond()).toBe(2);
      });
    });
    describe('#pause', () => {
      it('normal', () => {
        context.config.set({ leftTime: 2 });
        fixture.detectChanges();
        expect(getSecond()).toBe(2);
        vi.advanceTimersByTime(1000);
        expect(getSecond()).toBe(1);
        context.comp()?.pause();
        vi.advanceTimersByTime(1000);
        expect(getSecond()).toBe(1);
        context.comp()?.resume();
      });

      it('when parsed', () => {
        context.config.set({ leftTime: 2 });
        fixture.detectChanges();
        expect(getSecond()).toBe(2);
        context.comp()?.pause();
        vi.advanceTimersByTime(1000);
        expect(getSecond()).toBe(2);
        context.comp()?.pause();
        vi.advanceTimersByTime(1000);
        expect(getSecond()).toBe(2);
        context.comp()?.resume();
      });
    });
    describe('#resume', () => {
      it('normal', () => {
        context.config.set({ leftTime: 3 });
        fixture.detectChanges();
        expect(getSecond()).toBe(3);
        vi.advanceTimersByTime(1000);
        expect(getSecond()).toBe(2);
        context.comp()?.pause();
        vi.advanceTimersByTime(1000);
        expect(getSecond()).toBe(2);
        context.comp()?.resume();
        vi.advanceTimersByTime(1000);
        expect(getSecond()).toBe(1);
        context.comp()?.resume();
      });
      it('without pause', () => {
        context.config.set({ leftTime: 2 });
        fixture.detectChanges();
        expect(getSecond()).toBe(2);
        vi.advanceTimersByTime(1000);
        expect(getSecond()).toBe(1);
        context.comp()?.resume();
        expect(getSecond()).toBe(1);
      });
    });
  });

  describe('[events]', () => {
    it('(event)', () => {
      context.config.set({ demand: true, leftTime: 1 });
      expect(context.handleEvent).not.toHaveBeenCalled();
      context.comp()?.begin();
      expect(context.handleEvent).toHaveBeenCalled();
    });
  });
});

@Component({
  template: `<countdown [config]="config()" (event)="handleEvent($event)" />`,
  imports: [CountdownComponent],
})
class TestNGComponent {
  comp = viewChild(CountdownComponent);
  config = signal<CountdownConfig>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleEvent(_: CountdownEvent): void { }
}
