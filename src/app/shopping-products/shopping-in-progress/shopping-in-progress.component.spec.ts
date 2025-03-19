import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingInProgressComponent } from './shopping-in-progress.component';

describe('ShoppingInProgressComponent', () => {
  let component: ShoppingInProgressComponent;
  let fixture: ComponentFixture<ShoppingInProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingInProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
