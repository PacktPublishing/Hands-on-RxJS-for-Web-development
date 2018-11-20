import {Component, OnInit} from '@angular/core';
import { Http, Headers, Jsonp, URLSearchParams } from '@angular/http';
import {debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from "rxjs/operators";
import {fromEvent} from "rxjs";

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {
  public times = 0;

  constructor(private jsonp: Jsonp) {
  }

  ngOnInit() {

    const $input = document.querySelector('#textInput');

    // 2.tap
    const output$ = fromEvent($input, 'keyup').pipe(
      map((e: any) => e.target.value),
      tap((value) => console.log('value after map ', value)),
      filter(text => text.length > 2),
      debounceTime(750),
      distinctUntilChanged(),
      tap((value) => console.log('value after distinct ', value)),
      switchMap((text) => this.makeWikiSearch(text))
    );
    output$.subscribe(console.log);

    // 3.timestamp
    // const output$ = fromEvent($input, 'keyup').pipe(
    //   map(e => e.target.value),
    //   // tap((value) => console.log('value after map ', value)),
    //   filter(text => text.length > 2),
    //   debounceTime(750),
    //   distinctUntilChanged(),
    //   timestamp(),
    //   tap((value) => console.log('value after distinct ', value)),
    //   switchMap((text) => makeWikiSearch(text))
    // )
    // output$.subscribe()


    // 4. materialize/dematerialize
    // const output$ = fromEvent($input, 'keyup').pipe(
    //   map(e => e.target.value),
    //   filter(text => text.length > 2),
    //   debounceTime(750),
    //   distinctUntilChanged(),
    //   materialize(),
    //   tap((value) => console.log('value after distinct ', value)),
    //   dematerialize(),
    //   switchMap((text) => makeWikiSearch(text))
    // )
    // output$.subscribe();

  }

  makeWikiSearch(text){
    let wikiUrl = 'http://en.wikipedia.org/w/api.php';
    let params = new URLSearchParams();
    params.set('search', text);
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', `__ng_jsonp__.__req${this.times}.finished`);
    this.times=this.times+1;
    return this.jsonp
      .get(wikiUrl, { search: params })
      .pipe(map(response => <string[]> response.json()[1]));
  }

}
