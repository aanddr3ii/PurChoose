import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellProductPictureEmpresaurioComponent } from './sell-product-picture-empresaurio.component';

describe('SellProductPictureEmpresaurioComponent', () => {
  let component: SellProductPictureEmpresaurioComponent;
  let fixture: ComponentFixture<SellProductPictureEmpresaurioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellProductPictureEmpresaurioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellProductPictureEmpresaurioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
