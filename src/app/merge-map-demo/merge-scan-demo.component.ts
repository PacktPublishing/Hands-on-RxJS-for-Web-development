import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { mergeScan } from 'rxjs/operators';
import { fromEvent, EMPTY } from 'rxjs';

@Component({
    selector: 'app-merge-map-demo',
    templateUrl: './merge-scan-demo.component.html',
    styleUrls: ['./merge-scan-demo.component.scss']
})
export class MergeScanDemoComponent implements OnInit {
    public items: number[] = [1, 2, 3, 4, 5];
    @ViewChild('moreButton') moreButton: ElementRef;
    public disableMoreButton: boolean = false;

    constructor() {
    }

    ngOnInit() {

        this.getItems().subscribe((result: any) => {
            this.items = this.items.concat(result.response.data);
            if (!('nextIndex' in result.response)) {
                this.disableMoreButton = true;
            }
        })
    }

    getItems() {
        const baseUrl = 'http://127.0.0.1:4001/list-data?page=';
        const fetchMoreEvents$ = fromEvent(this.moreButton.nativeElement, 'click');

        return fetchMoreEvents$.pipe(
            mergeScan((prevAjaxResponse, next) => {
                    if ('nextIndex' in prevAjaxResponse.response) {
                        return ajax.get(baseUrl + prevAjaxResponse.response.nextIndex)
                    }
                    return EMPTY;
                },
                {response: {nextIndex: 1}}, // Initial acc value
                1 // Maximum concurrency, 1 - to prevent race conditions
            )
        )
    }

}
