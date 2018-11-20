import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {JsonpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {CounterComponent} from './counter/counter.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';


@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    AutoCompleteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
