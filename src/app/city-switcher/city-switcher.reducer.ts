import { Action } from '@ngrx/store';

interface StepSwitcherAction extends Action {
    payload?: number;
}

const SAVE_CITY_PRICE = 'SAVE_CITY_PRICE';

const initialState = 0;

const citySwitcherReducer = (state: number = initialState, action: StepSwitcherAction) => {
    switch (action.type) {
        case SAVE_CITY_PRICE:
            return action.payload;

        default:
            return state;
    }
};

export {
    citySwitcherReducer,
    SAVE_CITY_PRICE
}