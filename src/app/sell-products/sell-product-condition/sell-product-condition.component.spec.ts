import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellProductConditionComponent } from './sell-product-condition.component';

describe('SellProductConditionComponent', () => {
  let component: SellProductConditionComponent;
  let fixture: ComponentFixture<SellProductConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellProductConditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellProductConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
