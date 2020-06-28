import { Component, ViewChild, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CountdownModule } from '../src/countdown.module';
import { CountdownConfig, CountdownEvent, CountdownStatus } from '../src/interfaces';
import { CountdownComponent } from '../src/countdown.component';

describe('Component: ngx-countdown', () => {
  let fixture: ComponentFixture<TestNGComponent>;
  let context: TestNGComponent;
  let dl: DebugElement;
  let spy: jasmine.Spy<(_e: CountdownEvent) => void>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestNGComponent],
      imports: [CountdownModule],
    });
    fixture = TestBed.createComponent(TestNGComponent);
    context = fixture.componentInstance;
    dl = fixture.debugElement;
    spy = spyOn(context, 'handleEvent');
  });

  afterEach(() => {
    if (context.comp) {
      context.comp.ngOnDestroy();
    }
  });

  function getSecond(): number {
    return context.comp.i.value / 1000;
  }

  describe('[default]', () => {
    it('should notify in 1s', fakeAsync(() => {
      context.config = { leftTime: 2, notify: [1] };
      fixture.detectChanges();
      tick(1001);
      expect(spy.calls.mostRecent().args[0].action).toBe('notify');
      tick(1000);
    }));
    it('should be throw error when notify is not positive integer', () => {
      expect(() => {
        context.config = { leftTime: 2, notify: [0.1] };
        fixture.detectChanges();
      }).toThrow();
    });
    it('should be demand start', () => {
      context.config = { demand: true, leftTime: 1 };
      fixture.detectChanges();
      expect(context.handleEvent).not.toHaveBeenCalled();
      context.comp.begin();
      expect(spy.calls.first().args[0].status).toBe(CountdownStatus.ing);
      expect((dl.nativeElement as HTMLElement).textContent.trim()).toBe(`00:00:01`);
    });
    it('should be re-init when reassigning config value', () => {
      context.config = { leftTime: 2 };
      fixture.detectChanges();
      expect(getSecond()).toBe(2);
      context.config = { leftTime: 3 };
      fixture.detectChanges();
      expect(getSecond()).toBe(3);
    });
    it('should be custom format', fakeAsync(() => {
      context.config = { leftTime: 2, format: 'm' };
      fixture.detectChanges();
      tick(250);
      fixture.detectChanges();
      expect(context.comp.i.text).toBe(`0`);
      tick(2000);
    }));
  });

  describe('[actions]', () => {
    it('#begin', () => {
      context.config = { demand: true, leftTime: 1 };
      fixture.detectChanges();
      expect(context.handleEvent).not.toHaveBeenCalled();
      context.comp.begin();
      expect(spy.calls.first().args[0].status).toBe(CountdownStatus.ing);
    });
    describe('#restart', () => {
      it('normal', fakeAsync(() => {
        context.config = { leftTime: 2 };
        fixture.detectChanges();
        expect(getSecond()).toBe(2);
        tick(1001);
        expect(getSecond()).toBe(1);
        context.comp.restart();
        fixture.detectChanges();
        expect(getSecond()).toBe(2);
        tick(3000);
      }));
      it('when stoped', fakeAsync(() => {
        context.config = { leftTime: 2 };
        fixture.detectChanges();
        expect(getSecond()).toBe(2);
        context.comp.stop();
        fixture.detectChanges();
        tick(1001);
        expect(getSecond()).toBe(2);
        context.comp.restart();
        fixture.detectChanges();
        expect(getSecond()).toBe(2);
        tick(3000);
      }));
    });
    describe('#stop', () => {
      it('normal', fakeAsync(() => {
        context.config = { leftTime: 2 };
        fixture.detectChanges();
        expect(getSecond()).toBe(2);
        tick(1001);
        expect(getSecond()).toBe(1);
        context.comp.stop();
        fixture.detectChanges();
        tick(1001);
        expect(getSecond()).toBe(1);
        tick(3000);
      }));
      it('when stoped', fakeAsync(() => {
        context.config = { leftTime: 2 };
        fixture.detectChanges();
        expect(getSecond()).toBe(2);
        context.comp.stop();
        fixture.detectChanges();
        tick(1001);
        expect(getSecond()).toBe(2);
        context.comp.stop();
        fixture.detectChanges();
        tick(1001);
        expect(getSecond()).toBe(2);
        tick(3000);
      }));
    });
    describe('#pause', () => {
      it('normal', fakeAsync(() => {
        context.config = { leftTime: 2 };
        fixture.detectChanges();
        expect(getSecond()).toBe(2);
        tick(1001);
        expect(getSecond()).toBe(1);
        context.comp.pause();
        tick(1001);
        expect(getSecond()).toBe(1);
        context.comp.resume();
        tick(3000);
      }));

      it('when parsed', fakeAsync(() => {
        context.config = { leftTime: 2 };
        fixture.detectChanges();
        expect(getSecond()).toBe(2);
        context.comp.pause();
        tick(1001);
        expect(getSecond()).toBe(2);
        context.comp.pause();
        tick(1001);
        expect(getSecond()).toBe(2);
        context.comp.resume();
        tick(3000);
      }));
    });
    describe('#resume', () => {
      it('normal', fakeAsync(() => {
        context.config = { leftTime: 3 };
        fixture.detectChanges();
        expect(getSecond()).toBe(3);
        tick(1001);
        expect(getSecond()).toBe(2);
        context.comp.pause();
        tick(1001);
        expect(getSecond()).toBe(2);
        context.comp.resume();
        tick(1001);
        expect(getSecond()).toBe(1);
        context.comp.resume();
        tick(3000);
      }));
      it('without pause', fakeAsync(() => {
        context.config = { leftTime: 2 };
        fixture.detectChanges();
        expect(getSecond()).toBe(2);
        tick(1001);
        expect(getSecond()).toBe(1);
        context.comp.resume();
        expect(getSecond()).toBe(1);
        tick(3000);
      }));
    });
  });

  describe('[events]', () => {
    it('(event)', () => {
      context.config = { demand: true, leftTime: 1 };
      fixture.detectChanges();
      expect(context.handleEvent).not.toHaveBeenCalled();
      context.comp.begin();
      expect(context.handleEvent).toHaveBeenCalled();
    });
  });
});

@Component({
  template: ` <countdown #comp [config]="config" (event)="handleEvent($event)"></countdown> `,
})
class TestNGComponent {
  @ViewChild('comp', { static: false }) comp: CountdownComponent;

  config: CountdownConfig = {};

  handleEvent(_e: CountdownEvent): void {}
}
