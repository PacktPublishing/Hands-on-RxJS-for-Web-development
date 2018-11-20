import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {interval, Observable} from "rxjs";
import { create } from "rxjs-spy";
import { tag } from "rxjs-spy/operators/tag";

@Component({
  selector: 'counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
class CounterComponent implements OnInit {
  public counter1$: Observable<number>;
  public counter2$: Observable<number>;
  public counter3$: Observable<number>;
  public counter4$: Observable<number>;

  ngOnInit() {
    (window as any).spy = create();

    this.counter1$ = interval(1000).pipe(map(x => x + 1));
    this.counter2$ = interval(1500).pipe(map(x => x * 2));

    this.counter3$ = interval(1000).pipe(
      map(x => x + 1),
      tag('interval3')
    );
    this.counter4$ = interval(1500).pipe(
      map(x => x * 2),
      tag('interval4')
    );

    this.counter3$.subscribe();
    this.counter4$.subscribe();
  }
}

export {
  CounterComponent
}