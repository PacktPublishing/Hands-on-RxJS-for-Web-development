import { Component, OnDestroy, OnInit } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
    selector: 'app-merge-map-demo',
    templateUrl: './merge-map-demo.component.html',
    styleUrls: ['./merge-map-demo.component.scss']
})
export class MergeMapDemoComponent implements OnInit, OnDestroy {
    public items: string[] = [];
    private subscription: Subscription;

    constructor() {
    }

    ngOnInit() {

        this.subscription = this.getItems(0).subscribe(result => this.items = result)
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getItems(index, result = []) {
        const baseUrl = 'http://127.0.0.1:4001/list-data?page=';
        return ajax.get(baseUrl + index).pipe(
            mergeMap(
                (d) => {
                    result = result.concat(d.response.data);
                    if ('nextIndex' in d.response) {
                        return this.getItems(d.response.nextIndex, result);
                    }
                    return of(result);
                },
                null, // selector function - we don't need it here.
                1) // Maximum concurrency, 1 - to prevent race conditions
        )
    }

}
