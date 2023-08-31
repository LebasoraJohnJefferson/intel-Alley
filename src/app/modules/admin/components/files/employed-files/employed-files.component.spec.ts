import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployedFilesComponent } from './employed-files.component';

describe('EmployedFilesComponent', () => {
  let component: EmployedFilesComponent;
  let fixture: ComponentFixture<EmployedFilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployedFilesComponent]
    });
    fixture = TestBed.createComponent(EmployedFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
