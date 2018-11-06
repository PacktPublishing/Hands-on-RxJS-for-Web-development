import {TestBed} from '@angular/core/testing';

import {MyServiceService} from './my-service.service';
import {HttpClient} from "@angular/common/http";
import {asyncScheduler, of, VirtualTimeScheduler} from "rxjs";

describe('MyServiceService - VirtualTimeScheduler', () => {
  let service: MyServiceService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: {}}
      ]
    });
    service = TestBed.get(MyServiceService);
  });

  describe('testing getData (with repeatWhen) with done VirtualTimeScheduler', () => {
    let mockData;
    beforeEach(() => {
      mockData = 5;

    });

    it('should add values to array 5+1 times', () => {
      let cumulativeArray = [];
      const sched = new VirtualTimeScheduler();
      (service as any).http.get = jasmine.createSpy().and.returnValue(of(mockData, sched));

      service.getData(1, sched).subscribe((value) => cumulativeArray.push(value));
      sched.flush();
      expect(cumulativeArray.length).toEqual(6);
      expect(cumulativeArray[cumulativeArray.length - 1]).toEqual(mockData);
    });

  });
});
