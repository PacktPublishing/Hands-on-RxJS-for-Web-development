import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor() {
    }

    getCitiesInfo() {
        //retun ajax('http://back-end.com/get-cities');
        return of({
            London: 25,
            Paris: 30,
            Rome: 35
        }).pipe(delay(1000))
    }

    getTaxCoefficients() {
        //retun ajax('http://back-end.com/get-coefficients');
        return of([1, 1.2, 1.5]).pipe(delay(1200))
    }
}
