import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {UPDATE_STEP} from './step-switcher.reducer';

@Component({
  selector: 'step-switcher',
  templateUrl: './step-switcher.component.html',
  styleUrls: ['./step-switcher.component.scss']
})
class StepSwitcherComponent {
  public step = 1;

  constructor(private store: Store<any>) {
  }

  setStepValue(value) {
    this.step = value;
    this.store.dispatch({
      type: UPDATE_STEP,
      payload: value
    })
  }
}

export {
  StepSwitcherComponent
}