import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { coefficientSwitcherReducer } from './coefficient-switcher/coefficient-switcher.reducer';
import { CoefficientSwitcherComponent } from './coefficient-switcher/coefficient-switcher.component';
import { CitySwitcherComponent } from './city-switcher/city-switcher.component';
import { PriceComponent } from './price/price.component';
import { HttpService } from './HttpService/http.service';
import { citySwitcherReducer } from './city-switcher/city-switcher.reducer';

let reducers = {
    cityPrice: citySwitcherReducer,
    coefficient: coefficientSwitcherReducer
};

@NgModule({
    declarations: [
        AppComponent,
        CoefficientSwitcherComponent,
        CitySwitcherComponent,
        PriceComponent
    ],
    imports: [
        BrowserModule,
        StoreModule.forRoot(reducers)
    ],
    providers: [HttpService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
