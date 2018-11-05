import {TestBed} from '@angular/core/testing';

import {MyServiceService} from './my-service.service';

describe('MyServiceService', () => {
  let service: MyServiceService;
  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.get(MyServiceService);
  });

  describe('testing with done callback', () => {

  });

  describe('testing with done VirtualTimeScheduler', () => {

  });

  describe('testing with TestScheduler.run', () => {

  });

  describe('testing with TestScheduler.flush', () => {

  });

  describe('testing with fakeAsync', () => {

  });

  describe('testing with BehaviorSubject', () => {

  });
});
