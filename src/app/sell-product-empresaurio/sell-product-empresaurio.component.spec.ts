import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellProductEmpresaurioComponent } from './sell-product-empresaurio.component';

describe('SellProductEmpresaurioComponent', () => {
  let component: SellProductEmpresaurioComponent;
  let fixture: ComponentFixture<SellProductEmpresaurioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellProductEmpresaurioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellProductEmpresaurioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
