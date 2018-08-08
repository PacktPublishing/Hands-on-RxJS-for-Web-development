import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { FormsModule }   from '@angular/forms';
@NgModule({
    declarations: [
        AppComponent,
        AutoCompleteComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpClientJsonpModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
