import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSurveyComponent } from './custom-survey.component';

describe('CustomSurveyComponent', () => {
  let component: CustomSurveyComponent;
  let fixture: ComponentFixture<CustomSurveyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomSurveyComponent]
    });
    fixture = TestBed.createComponent(CustomSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
