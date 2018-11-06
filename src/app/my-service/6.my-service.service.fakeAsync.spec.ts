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

  describe('testing with fakeAsync', () => {

  });

});
