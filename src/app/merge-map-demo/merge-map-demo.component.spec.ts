import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeScanDemoComponent } from './merge-map-demo.component';

describe('MergeScanDemoComponent', () => {
  let component: MergeScanDemoComponent;
  let fixture: ComponentFixture<MergeScanDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MergeScanDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeScanDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
