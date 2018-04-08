import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnChartComponent } from './return-chart.component';

describe('ReturnChartComponent', () => {
  let component: ReturnChartComponent;
  let fixture: ComponentFixture<ReturnChartComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ReturnChartComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
