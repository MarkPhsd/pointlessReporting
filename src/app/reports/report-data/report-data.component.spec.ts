import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDataComponent } from './report-data.component';

describe('ReportDataComponent', () => {
  let component: ReportDataComponent;
  let fixture: ComponentFixture<ReportDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
