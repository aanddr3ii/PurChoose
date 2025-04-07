import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDisplay2Component } from './product-display2.component';

describe('ProductDisplay2Component', () => {
  let component: ProductDisplay2Component;
  let fixture: ComponentFixture<ProductDisplay2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDisplay2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDisplay2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
