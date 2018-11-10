import {TestBed} from '@angular/core/testing';
import _isEqual from 'lodash-es/isEqual';
import {MyServiceService} from './my-service.service';
import {HttpClient} from "@angular/common/http";
import {TestScheduler} from "rxjs/testing";
import * as rxjs from 'rxjs';

describe('MyServiceService', () => {
  let service: MyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: {}}
      ]
    });
    service = TestBed.get(MyServiceService);
  });

  describe('Testing with TestScheduler.run', () => {
    let scheduler;
    beforeEach(() => {
      scheduler = new TestScheduler((actual, expected) => {
        //console.log(actual, expected);
        expect(_isEqual(actual, expected)).toBeTruthy();
      });
    });

    describe('getDataNoScheduler (repeatWhen)', () => {
      let oldValue;
      it('should repeat initial ajax call in 1 second', () => {

        scheduler.run((helpers) =>{
          const { cold, hot, expectObservable, expectSubscriptions, flush } = helpers;

          const expectedStateMap = {a: 4};
          let mock = cold('a|', expectedStateMap);
          (service as any).http.get = jasmine.createSpy('http.get').and.returnValue(mock);

          const expected = "a 1s a 1s a 1s a 1s a 1s a|";

          expectObservable(service.getDataNoScheduler(1)).toBe(expected, expectedStateMap);
        })
      })
    });

    describe('getInputObservable(switchMap)', () => {

      it('should switch to last input value ajax request only', () => {
        scheduler.run((helpers) =>{
          const { cold, hot, expectObservable, expectSubscriptions, flush } = helpers;

          let mockInputElem = document.createElement('input');
          Object.defineProperty(rxjs, 'fromEvent', {
            value: () => cold('a 800ms b 700ms c 1700ms |', {a: 'a', b: 'aaa', c: 'aaab'})
          });
          service.makeWikiSearch = () => cold("(d|)", {d: ['text1','text2','text3']});

          const expected = "2252ms r 950ms |";

          expectObservable(service.getInputObservable(mockInputElem)).toBe(expected, {r: ['text1','text2','text3']});
        })
      });

    });
  });


});
