import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfEmployedAnalyticsComponent } from './self-employed-analytics.component';

describe('SelfEmployedAnalyticsComponent', () => {
  let component: SelfEmployedAnalyticsComponent;
  let fixture: ComponentFixture<SelfEmployedAnalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelfEmployedAnalyticsComponent]
    });
    fixture = TestBed.createComponent(SelfEmployedAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
