import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcatMapDemoComponent } from './concat-map-demo.component';

describe('ConcatMapDemoComponent', () => {
  let component: ConcatMapDemoComponent;
  let fixture: ComponentFixture<ConcatMapDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcatMapDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcatMapDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
