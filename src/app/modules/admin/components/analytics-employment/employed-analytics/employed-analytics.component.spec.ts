import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployedAnalyticsComponent } from './employed-analytics.component';

describe('EmployedAnalyticsComponent', () => {
  let component: EmployedAnalyticsComponent;
  let fixture: ComponentFixture<EmployedAnalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployedAnalyticsComponent]
    });
    fixture = TestBed.createComponent(EmployedAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
