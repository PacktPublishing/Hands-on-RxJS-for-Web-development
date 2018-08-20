import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MergeScanDemoComponent } from './merge-scan-demo/merge-scan-demo.component';
@NgModule({
    declarations: [
        AppComponent,
        MergeScanDemoComponent,
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
