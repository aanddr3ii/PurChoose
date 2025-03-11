import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrductReviewButtonComponent } from './prduct-review-button.component';

describe('PrductReviewButtonComponent', () => {
  let component: PrductReviewButtonComponent;
  let fixture: ComponentFixture<PrductReviewButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrductReviewButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrductReviewButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
