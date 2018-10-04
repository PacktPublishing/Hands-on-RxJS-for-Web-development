import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-dummy',
    templateUrl: './dummy.component.html',
    styleUrls: ['./dummy.component.scss']
})
export class DummyComponent implements OnInit, OnDestroy {
    public value: number = 0;
    private destroy$ = new Subject();

    constructor() {
    }

    ngOnInit() {
        console.log('ngOnInit');
        interval(800).pipe(takeUntil(this.destroy$))
            .subscribe((value) => {
                console.log(value, this);
                this.value = value;
            })
    }

    ngOnDestroy() {
        console.log('ngOnDestroy');
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
