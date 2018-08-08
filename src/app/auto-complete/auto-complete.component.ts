import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap, map } from 'rxjs/operators';
import {fromEvent} from 'rxjs';

const wikiUrl = 'https://en.wikipedia.org/w/api.php?';

@Component({
    selector: 'app-auto-complete',
    templateUrl: './auto-complete.component.html',
    styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements AfterViewInit {
    public items: string[] = [];
    public searchText: FormControl = new FormControl('');
    @ViewChild('textInput') input;
    constructor(private http: HttpClient) {
    }

    ngAfterViewInit() {

        fromEvent(this.input.nativeElement, 'keyup').pipe(
            map(e => (e as any).target.value),
            switchMap((value) => this.getWikiSearchResults(value))
        )

            .subscribe((response) => {
                console.log('response[1]', response[1]);
                this.items = response[1];
            })
    }


    getWikiSearchResults(value) {

        const params = new HttpParams()
            .set('action', 'opensearch')
            .set('format', 'json')
            .set('search', value);

        const searchUrl: string = wikiUrl + params.toString();

        return this.http.jsonp(searchUrl, 'callback');
    }

    onItemClick(item) {
        this.items = [];
        this.input.nativeElement.value = item;
    }
}
