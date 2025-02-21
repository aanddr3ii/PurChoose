import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRefundComponent } from './product-refund.component';

describe('ProductRefundComponent', () => {
  let component: ProductRefundComponent;
  let fixture: ComponentFixture<ProductRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductRefundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
