import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {stepSwitcherReducer} from './step-switcher/step-switcher.reducer';
import {StepSwitcherComponent} from './step-switcher/step-switcher.component';
import {CounterComponent} from './counter/counter.component';

let reducers = {
  stepValue: stepSwitcherReducer
};

@NgModule({
  declarations: [
    AppComponent,
    StepSwitcherComponent,
    CounterComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
