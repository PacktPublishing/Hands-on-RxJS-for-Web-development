import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';

@Component({
  selector: 'counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
class CounterComponent implements OnInit, OnDestroy {
  public counter = 0;
  public step = 1;
  private clearId: any;

  constructor(private store: Store<any>) {
  }

  ngOnInit() {
    this.store.pipe(map(state => state.stepValue))
      .subscribe((stepValue) => this.step = stepValue);

    this.startCounter();
  }

  startCounter() {
    this.clearId = setInterval(() => {
      this.counter = this.counter + this.step;
    }, 1000)
  }

  ngOnDestroy() {
    clearInterval(this.clearId);
  }
}

export {
  CounterComponent
}