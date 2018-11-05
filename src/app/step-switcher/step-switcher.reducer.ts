import {Action} from '@ngrx/store';

interface StepSwitcherAction extends Action {
  payload?: number;
}

const UPDATE_STEP = 'UPDATE_STEP';

const initialState = 1;

const stepSwitcherReducer = (state: number = initialState, action: StepSwitcherAction) => {
  switch (action.type) {
    case UPDATE_STEP:
      return action.payload;

    default:
      return state;
  }
}

export {
  stepSwitcherReducer,
  UPDATE_STEP
}