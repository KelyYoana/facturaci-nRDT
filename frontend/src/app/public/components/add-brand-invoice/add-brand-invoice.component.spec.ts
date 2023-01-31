import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBrandInvoiceComponent } from './add-brand-invoice.component';

describe('AddBrandInvoiceComponent', () => {
  let component: AddBrandInvoiceComponent;
  let fixture: ComponentFixture<AddBrandInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBrandInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBrandInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
