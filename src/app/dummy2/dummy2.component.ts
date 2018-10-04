import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval} from 'rxjs';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-dummy2',
  templateUrl: './dummy2.component.html',
  styleUrls: ['./dummy2.component.scss']
})
export class Dummy2Component implements OnInit, OnDestroy {

    public value: number = 0;
    private destroyValue = true;

    constructor() {
    }

    ngOnInit() {
        console.log('ngOnInit');
        interval(800).pipe(takeWhile(() => this.destroyValue))
            .subscribe((value) => {
                console.log(value, this);
                this.value = value;
            })
    }

    ngOnDestroy() {
        console.log('ngOnDestroy');
        this.destroyValue = false;
    }

}
