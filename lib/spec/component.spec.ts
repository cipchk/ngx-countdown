// tslint:disable:no-use-before-declare
import { Component, ViewChild, DebugElement } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { CountdownModule } from '../src/countdown.module';
import { Config } from '../src/interfaces';
import { CountdownComponent } from '../src/countdown.component';

describe('Component: ngx-countdown', () => {
  let fixture: ComponentFixture<TestNGComponent>;
  let context: TestNGComponent;
  let dl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestNGComponent],
      imports: [CountdownModule],
    });
    fixture = TestBed.createComponent(TestNGComponent);
    context = fixture.componentInstance;
    dl = fixture.debugElement;
    spyOn(context, 'start');
    spyOn(context, 'finished');
    spyOn(context, 'notify');
    spyOn(context, 'event');
  });

  afterEach(() => context.comp.ngOnDestroy());

  function getSecond(): number {
    const els = (dl.nativeElement as HTMLElement).querySelectorAll(
      '.hand-s span',
    );
    return +els[1].textContent;
  }

  describe('[default]', () => {
    it('fixture should not be null', () => {
      fixture.detectChanges();
      expect(fixture).not.toBeNull();
    });
    it('should notify in 1s', (done: () => void) => {
      context.config = { leftTime: 2, notify: [1] };
      fixture.detectChanges();
      expect(context.notify).not.toHaveBeenCalled();
      setTimeout(() => {
        expect(context.notify).toHaveBeenCalled();
        done();
      }, 1001);
    });
    it('should be throw error when notify is not positive integer', () => {
      expect(() => {
        context.config = { leftTime: 2, notify: [0.1] };
        fixture.detectChanges();
      }).toThrow();
    });
    it('should be demand start', () => {
      context.config = { demand: true, leftTime: 1 };
      fixture.detectChanges();
      expect(context.start).not.toHaveBeenCalled();
      context.comp.begin();
      expect(context.start).toHaveBeenCalled();
    });
    it('should be re-init when reassigning config value', fakeAsync(() => {
      context.config = { leftTime: 2 };
      fixture.detectChanges();
      expect(getSecond()).toBe(2);
      tick(1000);
      context.config = { leftTime: 3 };
      fixture.detectChanges();
      expect(getSecond()).toBe(3);
    }));
    it('should be custom render template', (done: () => void) => {
      context.config = { leftTime: 2, template: '$!s-ext!s' };
      fixture.detectChanges();
      setTimeout(() => {
        expect(getSecond()).toBe(1);
        done();
      }, 250);
    });
    it('should be custom repaint function', (done: () => void) => {
      let callCount = 0;
      context.config = {
        leftTime: 2,
        repaint: function() {
          ++callCount;
        },
      };
      fixture.detectChanges();
      setTimeout(() => {
        expect(callCount).toBeGreaterThan(0);
        done();
      }, 250);
    });
  });

  describe('[actions]', () => {
    it('#begin', () => {
      context.config = { demand: true, leftTime: 1 };
      fixture.detectChanges();
      expect(context.start).not.toHaveBeenCalled();
      context.comp.begin();
      expect(context.start).toHaveBeenCalled();
    });
    describe('#restart', () => {
      it('normal', (done: () => void) => {
        context.config = { leftTime: 2 };
        fixture.detectChanges();
        expect(getSecond()).toBe(2);
        setTimeout(() => {
          expect(getSecond()).toBe(1);
          context.comp.restart();
          fixture.detectChanges();
          expect(getSecond()).toBe(2);
          done();
        }, 1001);
      });
      it('when stoped', (done: () => void) => {
        context.config = { leftTime: 2 };
        fixture.detectChanges();
        expect(getSecond()).toBe(2);
        context.comp.stop();
        fixture.detectChanges();
        setTimeout(() => {
          expect(getSecond()).toBe(2);
          context.comp.restart();
          fixture.detectChanges();
          expect(getSecond()).toBe(2);
          done();
        }, 1001);
      });
    });
    describe('#stop', () => {
      it('normal', (done: () => void) => {
        context.config = { leftTime: 2 };
        fixture.detectChanges();
        expect(getSecond()).toBe(2);
        setTimeout(() => {
          expect(getSecond()).toBe(1);
          context.comp.stop();
          fixture.detectChanges();
          setTimeout(() => {
            expect(getSecond()).toBe(1);
            done();
          }, 1001);
        }, 1001);
      });
      it('when stoped', (done: () => void) => {
        context.config = { leftTime: 2 };
        fixture.detectChanges();
        expect(getSecond()).toBe(2);
        context.comp.stop();
        fixture.detectChanges();
        setTimeout(() => {
          expect(getSecond()).toBe(2);
          context.comp.stop();
          fixture.detectChanges();
          setTimeout(() => {
            expect(getSecond()).toBe(2);
            done();
          }, 1001);
        }, 1001);
      });
    });
    describe('#pause', () => {
      it('normal', (done: () => void) => {
        context.config = { leftTime: 2 };
        fixture.detectChanges();
        expect(getSecond()).toBe(2);
        setTimeout(() => {
          expect(getSecond()).toBe(1);
          context.comp.pause();
          fixture.detectChanges();
          setTimeout(() => {
            expect(getSecond()).toBe(1);
            done();
          }, 1001);
        }, 1001);
      });

      it('when parsed', (done: () => void) => {
        context.config = { leftTime: 2 };
        fixture.detectChanges();
        expect(getSecond()).toBe(2);
        context.comp.pause();
        fixture.detectChanges();
        setTimeout(() => {
          expect(getSecond()).toBe(2);
          context.comp.pause();
          fixture.detectChanges();
          setTimeout(() => {
            expect(getSecond()).toBe(2);
            done();
          }, 1001);
        }, 1001);
      });
    });
    describe('#resume', () => {
      it('normal', (done: () => void) => {
        context.config = { leftTime: 3 };
        fixture.detectChanges();
        expect(getSecond()).toBe(3);
        setTimeout(() => {
          expect(getSecond()).toBe(2);
          context.comp.pause();
          setTimeout(() => {
            expect(getSecond()).toBe(2);
            context.comp.resume();
            setTimeout(() => {
              expect(getSecond()).toBe(1);
              done();
            }, 1001);
          }, 1001);
        }, 1001);
      });
      it('without pause', (done: () => void) => {
        context.config = { leftTime: 2 };
        fixture.detectChanges();
        expect(getSecond()).toBe(2);
        setTimeout(() => {
          expect(getSecond()).toBe(1);
          context.comp.resume();
          fixture.detectChanges();
          expect(getSecond()).toBe(1);
          done();
        }, 1001);
      });
    });
  });

  describe('[events]', () => {
    it('(start)', () => {
      context.config = { demand: true, leftTime: 1 };
      fixture.detectChanges();
      expect(context.start).not.toHaveBeenCalled();
      expect(context.event).not.toHaveBeenCalled();
      context.comp.begin();
      expect(context.start).toHaveBeenCalled();
      expect(context.event).toHaveBeenCalled();
    });
    it('(finished)', (done: () => void) => {
      context.config = { demand: true, leftTime: 1 };
      fixture.detectChanges();
      expect(context.finished).not.toHaveBeenCalled();
      expect(context.event).not.toHaveBeenCalled();
      context.comp.begin();
      setTimeout(() => {
        expect(context.finished).toHaveBeenCalled();
        expect(context.event).toHaveBeenCalled();
        done();
      }, 2001);
    });
  });
});

@Component({
  template: `
    <countdown #comp
        [config]="config"
        (start)="start()"
        (finished)="finished()"
        (notify)="notify()"
        (event)="event()"></countdown>
    `,
})
class TestNGComponent {
  @ViewChild('comp')
  comp: CountdownComponent;
  config: Config = {};
  start() {}
  finished() {}
  notify() {}
  event() {}
}
