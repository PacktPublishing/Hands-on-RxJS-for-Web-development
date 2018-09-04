import { Action } from '@ngrx/store';

interface StepSwitcherAction extends Action {
    payload?: number;
}

const SAVE_COEFFICIENT = 'SAVE_COEFFICIENT';

const initialState = 0;

const coefficientSwitcherReducer = (state: number = initialState, action: StepSwitcherAction) => {
    switch (action.type) {
        case SAVE_COEFFICIENT:
            return action.payload;

        default:
            return state;
    }
};

export {
    coefficientSwitcherReducer,
    SAVE_COEFFICIENT
}