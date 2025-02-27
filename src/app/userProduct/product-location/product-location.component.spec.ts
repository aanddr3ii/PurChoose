import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLocationComponent } from './product-location.component';

describe('ProductLocationComponent', () => {
  let component: ProductLocationComponent;
  let fixture: ComponentFixture<ProductLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
