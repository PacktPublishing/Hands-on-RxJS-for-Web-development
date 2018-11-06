import {TestBed} from '@angular/core/testing';

import {MyServiceService} from './my-service.service';
import {HttpClient} from "@angular/common/http";

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

  describe('testing sync sequences', () => {
    it('getRange should return 1..2..3..4 values', () => {
      let result: number[] = [];

      service.getRange().subscribe(value => result.push(value))

      expect(result).toEqual([1,2,3,4]);
    });
  });
  // describe('testing with done callback', () => {
  //
  //
  //
  // });
  //
  // describe('testing with done VirtualTimeScheduler', () => {
  //
  // });
  //
  // describe('testing with TestScheduler.run', () => {
  //
  // });
  //
  // describe('testing with TestScheduler.flush', () => {
  //
  // });
  //
  // describe('testing with fakeAsync', () => {
  //
  // });
  //
  // describe('testing with BehaviorSubject', () => {
  //
  // });
});
