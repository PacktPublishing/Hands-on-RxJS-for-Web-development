import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeMapDemoComponent } from './merge-map-demo.component';

describe('MergeMapDemoComponent', () => {
  let component: MergeMapDemoComponent;
  let fixture: ComponentFixture<MergeMapDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MergeMapDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeMapDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
