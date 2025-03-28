import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellProductCategoryComponent } from './sell-product-category.component';

describe('SellProductCategoryComponent', () => {
  let component: SellProductCategoryComponent;
  let fixture: ComponentFixture<SellProductCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellProductCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
