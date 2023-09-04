import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticPieChartComponent } from './analytic-pie-chart.component';

describe('AnalyticPieChartComponent', () => {
  let component: AnalyticPieChartComponent;
  let fixture: ComponentFixture<AnalyticPieChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyticPieChartComponent]
    });
    fixture = TestBed.createComponent(AnalyticPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
