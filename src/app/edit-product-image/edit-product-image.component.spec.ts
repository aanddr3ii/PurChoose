import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductImageComponent } from './edit-product-image.component';

describe('EditProductImageComponent', () => {
  let component: EditProductImageComponent;
  let fixture: ComponentFixture<EditProductImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProductImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProductImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
