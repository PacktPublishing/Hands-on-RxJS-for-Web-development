import {TestBed} from '@angular/core/testing';

import {MyServiceService} from './my-service.service';
import {HttpClient} from "@angular/common/http";

describe('MyServiceService - sync', () => {
  let service: MyServiceService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: {}}
      ]
    });
    service = TestBed.get(MyServiceService);
  });

  describe('testing Sync sequences', () => {
    it('getRange should return 1..2..3..4 values', () => {
      let result: number[] = [];

      service.getRange().subscribe(value => result.push(value));
      expect(result).toEqual([1,2,3,4]);
    });
  });
});
