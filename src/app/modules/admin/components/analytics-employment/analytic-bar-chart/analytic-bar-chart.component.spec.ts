import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticBarChartComponent } from './analytic-bar-chart.component';

describe('AnalyticBarChartComponent', () => {
  let component: AnalyticBarChartComponent;
  let fixture: ComponentFixture<AnalyticBarChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyticBarChartComponent]
    });
    fixture = TestBed.createComponent(AnalyticBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
