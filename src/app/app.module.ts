import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DummyComponent } from './dummy/dummy.component';
import { Dummy2Component } from './dummy2/dummy2.component';
@NgModule({
    declarations: [
        AppComponent,
        DummyComponent,
        Dummy2Component
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpClientJsonpModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
