import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import {CounterComponent} from "./counter.component";
import {Store} from "@ngrx/store";
import {BehaviorSubject} from "rxjs";
import {map} from "rxjs/operators";

describe('CounterComponent', () => {
  let fixture, component;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CounterComponent
      ],
      providers: [{provide: Store, useValue: {}}]
    });
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
  }));

  describe('ngOnInit - with BehaviorSubject', () => {
    let mockState;
    beforeEach(() => {

      mockState = {
        stepValue: 5
      };

      component.store = new BehaviorSubject(mockState);
      component.store.select = (fn) => component.store.pipe(map(fn));
    });

    it('should assign state.stepValue to this.step', () => {
      component.step = 0;
      component.ngOnInit();

      expect(component.step).toEqual(mockState.stepValue);
    });
  });
});
