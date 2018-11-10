import {TestBed} from '@angular/core/testing';

import {MyServiceService} from './my-service.service';
import {HttpClient} from "@angular/common/http";
import {asyncScheduler, of} from "rxjs";

describe('MyServiceService - Async', () => {
  let service: MyServiceService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: {}}
      ]
    });
    service = TestBed.get(MyServiceService);
  });

  describe('testing getRangeAsync with Async sequences', () => {
    xit('getRangeAsync should return 1..2..3..4 values - no DONE callback', () => {
      let result: number[] = [];

      service.getRangeAsync().subscribe(value => result.push(value));

      expect(result).toEqual([1, 2, 3, 4]);
    });

    it('getRangeAsync should return 1..2..3..4 values - with DONE callback', (done) => {
      let result: number[] = [];

      service.getRangeAsync().subscribe(
        value => result.push(value),
        null,
        () => {
          expect(result).toEqual([1, 2, 3, 4]);
          done();
        }
      );
    });
  });

  describe('getAsyncCodeWithPromise', () => {

    it('should return "something" value', (done) => {
      let result;
      service.getAsyncCodeWithPromise().subscribe((value) => {
          result = value;
        },
        null,
        () => {
          expect(result).toBe('something');
          done();
        });
    })
  });
});
