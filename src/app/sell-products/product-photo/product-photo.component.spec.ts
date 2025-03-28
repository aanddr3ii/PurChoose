import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPhotoComponent } from './product-photo.component';

describe('ProductPhotoComponent', () => {
  let component: ProductPhotoComponent;
  let fixture: ComponentFixture<ProductPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPhotoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
