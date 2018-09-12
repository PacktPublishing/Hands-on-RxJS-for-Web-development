import { Component, OnDestroy, OnInit } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { concatMap, delay, mergeMap } from 'rxjs/operators';
import { forkJoin, of, Subject } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
    selector: 'app-concat-map-demo',
    templateUrl: './concat-map-demo.component.html',
    styleUrls: ['./concat-map-demo.component.scss']
})
export class ConcatMapDemoComponent implements OnInit, OnDestroy {
    public items: any[] = [
        {id: 1, value: 'item1'},
        {id: 2, value: 'item2'},
        {id: 3, value: 'item3'}
        ];
    public deleteSubject = new Subject();

    public deleteItems$ = this.deleteSubject.asObservable().pipe(
        concatMap(
            (id, index) => {
                if (index === 1) {
                    return this.deleteItem(id).pipe(delay(2000))
                }
                return this.deleteItem(id)
            },
            null) // selector function - we don't need it here.
    );

    private subscription: Subscription;

    constructor() {
    }

    ngOnInit() {

        this.subscription = this.deleteItems$.subscribe((response) => {
            let index = this.items.findIndex((item) => response.id === item.id);
            this.items.splice(index, 1);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    deleteItem(id) {
        // return ajax.post(deleteUrl, headers, {id})
        return of({id, success: true}).pipe(delay(2000));
    }

    deleteAllClick() {
        const ids = this.items.map((item) => item.id);
        const arrayOfObservables = ids.map((id) => this.deleteItem(id));
        forkJoin(arrayOfObservables).subscribe((responses) => {
            responses.forEach((response) =>{
                let index = this.items.findIndex((item) => response.id === item.id);
                this.items.splice(index, 1);
            });
        });
    }
}
