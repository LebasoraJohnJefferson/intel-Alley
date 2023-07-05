import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnusComponent } from './alumnus.component';

describe('AlumnusComponent', () => {
  let component: AlumnusComponent;
  let fixture: ComponentFixture<AlumnusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlumnusComponent]
    });
    fixture = TestBed.createComponent(AlumnusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
