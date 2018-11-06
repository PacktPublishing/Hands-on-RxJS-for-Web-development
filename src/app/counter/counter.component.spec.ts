import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import {CounterComponent} from "./counter.component";
import {Store} from "@ngrx/store";
import {BehaviorSubject} from "rxjs";

describe('AppComponent', () => {
  let fixture;
  let mockState;
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        CounterComponent
      ],
      providers: [{provide: Store, useValue: {}}]
    });
    TestBed.overrideComponent(CounterComponent, {set: {template: ''}});


    fixture = TestBed.createComponent(CounterComponent);

    mockState = {

    };

    fixture.store = new BehaviorSubject(mockState);
  }));
  // it('should create the app', async(() => {
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // }));
});
