import { TestBed, ComponentFixture, inject, async, fakeAsync, tick, flushMicrotasks } from '@angular/core/testing';

import {MyServiceService} from './my-service.service';
import {HttpClient} from "@angular/common/http";
import {asyncScheduler, of, VirtualTimeScheduler} from "rxjs";

describe('MyServiceService - testing with fakeAsync', () => {
  let service: MyServiceService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: {}}
      ]
    });
    service = TestBed.get(MyServiceService);
  });

  describe('testing getRangeAsync', () => {

    it('getRangeAsync should return 1..2..3..4 values - no DONE callback', fakeAsync(() => {
      let result: number[] = [];

      service.getRangeAsync().subscribe(value => result.push(value))
      tick(10);
      expect(result).toEqual([1, 2, 3, 4]);
    }));
  });

  describe('getUserPositionDetails (mergeMap)', () => {
    let mockData;
    beforeEach(() => {
      mockData = {salary: 10000};
      service.getUserInfo = jasmine.createSpy().and.returnValue(of({position: 'developer'}, asyncScheduler));
      (service as any).http.get = jasmine.createSpy().and.returnValue(of(mockData, asyncScheduler));
    });

    it('should return expected user position details', fakeAsync(() => {
      let result;
      service.getUserPositionDetails(13).subscribe((data) => {
        result = data;
      });
      tick(5);
      expect(service.getUserInfo).toHaveBeenCalledWith(13);
      expect(result).toEqual(mockData);
    }));
  });

  describe('getAsyncCodeWithPromise', () => {

    it('should return "something" value', fakeAsync(() => {
      let result;
      service.getAsyncCodeWithPromise().subscribe((value) => {
          result = value;
        });
      flushMicrotasks();
      expect(result).toBe('something');
    }));
  });

  describe('testing getDataNoScheduler (repeatWhen)', () => {
    let mockData;
    beforeEach(() => {
      mockData = 5;

    });

    it('should add values to array 5+1 times', fakeAsync(() => {
      let cumulativeArray = [];
      (service as any).http.get = () => of(mockData);

      service.getDataNoScheduler(1).subscribe((value) => cumulativeArray.push(value));
      tick(9000);
      expect(cumulativeArray.length).toEqual(6);
      expect(cumulativeArray[cumulativeArray.length - 1]).toEqual(mockData);
    }));

  });
});
