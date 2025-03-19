import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingFinalizedComponent } from './shopping-finalized.component';

describe('ShoppingFinalizedComponent', () => {
  let component: ShoppingFinalizedComponent;
  let fixture: ComponentFixture<ShoppingFinalizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingFinalizedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingFinalizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
