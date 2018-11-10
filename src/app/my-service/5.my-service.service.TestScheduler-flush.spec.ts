import {TestBed} from '@angular/core/testing';
import _isEqual from 'lodash-es/isEqual';
import {MyServiceService} from './my-service.service';
import {HttpClient} from "@angular/common/http";
import {asyncScheduler} from "rxjs";
import {TestScheduler} from "rxjs/testing";
import {ajax} from "rxjs/ajax";

describe('MyServiceService with TestScheduler.flush', () => {
  let service: MyServiceService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: {}}
      ]
    });
    service = TestBed.get(MyServiceService);
  });


  describe('getData (with repeatWhen)', () => {
    let scheduler;

    beforeEach(() =>{
      scheduler = new TestScheduler((actual, expected) => {
        // console.log(actual, expected);
        expect(_isEqual(actual, expected)).toBeTruthy();
      });
      (asyncScheduler.constructor as any).delegate = scheduler;
    });

    afterEach(() => {
      (asyncScheduler.constructor as any).delegate = undefined;
    });

    it('should repeat initial ajax call in 1 second', () => {
      scheduler.maxFrames = 10000;
      const valuesMap = {a: 4};
      let mock = scheduler.createColdObservable('(a|)', valuesMap);
      (service as any).http.get = () => mock;
      const expected = "aaaaa(a|)";

      scheduler.expectObservable(service.getData(0.01)).toBe(expected, valuesMap);

      scheduler.flush();
    })

  });

});
