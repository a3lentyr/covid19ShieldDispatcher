import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinterAdvanceDialogComponent } from './printer-advance-dialog.component';

describe('PrinterAdvanceDialogComponent', () => {
  let component: PrinterAdvanceDialogComponent;
  let fixture: ComponentFixture<PrinterAdvanceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterAdvanceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinterAdvanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
