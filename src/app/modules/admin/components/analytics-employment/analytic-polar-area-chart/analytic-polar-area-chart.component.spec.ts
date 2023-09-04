import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticPolarAreaChartComponent } from './analytic-polar-area-chart.component';

describe('AnalyticPolarAreaChartComponent', () => {
  let component: AnalyticPolarAreaChartComponent;
  let fixture: ComponentFixture<AnalyticPolarAreaChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyticPolarAreaChartComponent]
    });
    fixture = TestBed.createComponent(AnalyticPolarAreaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
