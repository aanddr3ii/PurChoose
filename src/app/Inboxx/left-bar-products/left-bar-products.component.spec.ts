import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftBarProductsComponent } from './left-bar-products.component';

describe('LeftBarProductsComponent', () => {
  let component: LeftBarProductsComponent;
  let fixture: ComponentFixture<LeftBarProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeftBarProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftBarProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
