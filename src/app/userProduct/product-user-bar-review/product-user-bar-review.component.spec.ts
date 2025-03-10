import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUserBarReviewComponent } from './product-user-bar-review.component';

describe('ProductUserBarReviewComponent', () => {
  let component: ProductUserBarReviewComponent;
  let fixture: ComponentFixture<ProductUserBarReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductUserBarReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductUserBarReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
