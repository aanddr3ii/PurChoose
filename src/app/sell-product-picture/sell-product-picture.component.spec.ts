import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellProductPictureComponent } from './sell-product-picture.component';

describe('SellProductPictureComponent', () => {
  let component: SellProductPictureComponent;
  let fixture: ComponentFixture<SellProductPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellProductPictureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellProductPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
