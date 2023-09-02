import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnemployedAnalyticsComponent } from './unemployed-analytics.component';

describe('UnemployedAnalyticsComponent', () => {
  let component: UnemployedAnalyticsComponent;
  let fixture: ComponentFixture<UnemployedAnalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnemployedAnalyticsComponent]
    });
    fixture = TestBed.createComponent(UnemployedAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
