import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUserBarComponent } from './product-user-bar.component';

describe('ProductUserBarComponent', () => {
  let component: ProductUserBarComponent;
  let fixture: ComponentFixture<ProductUserBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductUserBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductUserBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
