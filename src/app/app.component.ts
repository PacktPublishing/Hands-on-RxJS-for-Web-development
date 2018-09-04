import { Component } from '@angular/core';
import { HttpService } from './HttpService/http.service';
import { take } from 'rxjs/operators';
import { zip } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public widgetsVisibility = false;
    public citiesObject: any = {};
    public coefficientsList: number[] = [];

    constructor(private httpService: HttpService) {
    }

    ngOnInit() {
        const citiesObject$ = this.httpService.getCitiesInfo();
        const coefficientsList$ = this.httpService.getTaxCoefficients();

        zip(citiesObject$, coefficientsList$)
            .pipe(take(1))
            .subscribe(([citiesObject, coefficientsList]) => {
                this.widgetsVisibility = true
                this.citiesObject = citiesObject;
                this.coefficientsList = coefficientsList;
            })
    }
}
