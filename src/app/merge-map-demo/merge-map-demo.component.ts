import { Component, OnInit } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-merge-map-demo',
  templateUrl: './merge-map-demo.component.html',
  styleUrls: ['./merge-map-demo.component.scss']
})
export class MergeMapDemoComponent implements OnInit {
  public items: string[] = [];
  constructor() { }

  ngOnInit() {

      this.getItems(0).subscribe(result => this.items = result)
  }

  getItems(index, result = []) {
      const baseUrl = 'http://127.0.0.1:4001/list-data?page=';
      return ajax.get( baseUrl + index).pipe(
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
