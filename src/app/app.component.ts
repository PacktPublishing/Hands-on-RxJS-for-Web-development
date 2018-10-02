import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public items: any[] = [];

    public destroyClick() {
        this.items = [];
    }

    public createClick() {
        this.items = Array.from({ length: 10 }).map((u, i) => i); // fill with values
        console.log('this.items', this.items);
    }
}
