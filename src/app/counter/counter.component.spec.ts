import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {StepSwitcherComponent} from "./step-switcher/step-switcher.component";
import {CounterComponent} from "./counter/counter.component";
import {Store} from "@ngrx/store";
describe('AppComponent', () => {
  let fixture;
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        AppComponent, StepSwitcherComponent, CounterComponent
      ],
      providers: [{provide: Store, useValue: {}}]
    });

    fixture = TestBed.overrideComponent(StepSwitcherComponent, {
        set: {
          template: '<span>StepSwitcherComponent</span>'
        }})
      .overrideComponent(CounterComponent, {
        set: {
          template: '<span>CounterComponent</span>'
        }})
      .createComponent(AppComponent);
  }));
  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
