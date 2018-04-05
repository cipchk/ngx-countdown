import { Injectable } from '@angular/core';

@Injectable()
export class Timer {
    private fns: any[] = [];
    private commands: Function[] = [];
    private nextTime: number;
    private ing = false;

    start() {
        if (this.ing === true) return;

        this.ing = true;
        this.nextTime = +new Date();
        this.process();
    }

    private process() {
        while (this.commands.length) {
            this.commands.shift()();
        }
        let diff = +new Date() - this.nextTime;
        const count = 1 + Math.floor(diff / 100);

        diff = 100 - diff % 100;
        this.nextTime += 100 * count;

        let frequency: number, step: number, i: number, len: number;
        for (i = 0, len = this.fns.length; i < len; i += 2) {
            frequency = this.fns[i + 1];

            // 100/s
            if (0 === frequency) {
                this.fns[i](count);
                // 1000/s
            } else {
                // 先把末位至0，再每次加2
                frequency += 2 * count - 1;

                step = Math.floor(frequency / 20);
                if (step > 0) {
                    this.fns[i](step);
                }

                // 把末位还原成1
                this.fns[i + 1] = frequency % 20 + 1;
            }
        }

        if (this.ing)
            setTimeout(() => { this.process(); }, diff);
    }

    add(fn: Function, frequency: number) {
        this.commands.push(() => {
            this.fns.push(fn);
            this.fns.push(frequency === 1000 ? 1 : 0);
            this.ing = this.fns.length > 0;
        });
    }

    remove(fn: Function) {
        this.commands.push(() => {
            const i = this.fns.indexOf(fn);
            if (i !== -1) {
                this.fns.splice(i, 2);
            }
            this.ing = this.fns.length > 0;
        });
    }
}
