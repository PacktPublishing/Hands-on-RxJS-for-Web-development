import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, fromEvent, Subscription } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';

@Component({
    selector: 'price',
    templateUrl: './price.component.html',
    styleUrls: ['./price.component.scss']
})
class PriceComponent implements OnInit, OnDestroy {
    public value: number = 0;
    @ViewChild('sendButton') sendButton;
    private subscriptions: Subscription[] = [];

    constructor(private store: Store<any>) {
    }

    ngOnInit() {
        const button$ = fromEvent(this.sendButton.nativeElement, 'click');
        const cities$ = this.store.pipe(map((state) => state.cityPrice), filter(x => x > 0));
        const coefficients$ = this.store.pipe(map((state) => state.coefficient), filter(x => x > 0));

        this.subscriptions[0] = combineLatest(cities$, coefficients$)
            .subscribe(([cityValue, coefficient]) => {
                this.value = parseInt(cityValue, 10) * parseFloat(coefficient)
            });

        this.subscriptions[1] = button$.pipe(withLatestFrom(cities$, coefficients$))
            .subscribe(([event, cityValue, coefficient]) => {
                alert('Sending value=' + cityValue + ' and coef=' + coefficient)
            });
    }


    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
}

export {
    PriceComponent
}