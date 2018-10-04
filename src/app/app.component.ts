import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public createComponent = false;

    public destroyClick() {
        this.createComponent = false;
    }

    public createClick() {
        this.createComponent = true;
    }
}
