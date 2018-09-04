import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { SAVE_CITY_PRICE } from './city-switcher.reducer';

@Component({
    selector: 'city-switcher',
    templateUrl: './city-switcher.component.html',
    styleUrls: ['./city-switcher.component.scss']
})
class CitySwitcherComponent {
    public Object = Object;
    public activeIndex = 0;
    @Input() public citiesObject: any;

    constructor(private store: Store<any>) {}

    ngOnInit() {
        const firstCity = Object.keys(this.citiesObject)[0];
        const value = this.citiesObject[firstCity];
        this.store.dispatch({type: SAVE_CITY_PRICE, payload: value});
    }

    cityClick(value, index) {
        this.activeIndex = index;
        this.store.dispatch({type: SAVE_CITY_PRICE, payload: value});
    }
}

export {
    CitySwitcherComponent
}