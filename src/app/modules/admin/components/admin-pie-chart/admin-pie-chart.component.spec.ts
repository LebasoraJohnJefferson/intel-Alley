import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPieChartComponent } from './admin-pie-chart.component';

describe('AdminPieChartComponent', () => {
  let component: AdminPieChartComponent;
  let fixture: ComponentFixture<AdminPieChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPieChartComponent]
    });
    fixture = TestBed.createComponent(AdminPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
