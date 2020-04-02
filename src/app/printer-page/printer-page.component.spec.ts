import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinterPageComponent } from './printer-page.component';

describe('PrinterPageComponent', () => {
  let component: PrinterPageComponent;
  let fixture: ComponentFixture<PrinterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
