import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodosPagoComponentComponent } from './metodos-pago-component.component';

describe('MetodosPagoComponentComponent', () => {
  let component: MetodosPagoComponentComponent;
  let fixture: ComponentFixture<MetodosPagoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetodosPagoComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetodosPagoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
