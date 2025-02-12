import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripleProductDisplayComponent } from './triple-product-display.component';

describe('TripleProductDisplayComponent', () => {
  let component: TripleProductDisplayComponent;
  let fixture: ComponentFixture<TripleProductDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripleProductDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripleProductDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
