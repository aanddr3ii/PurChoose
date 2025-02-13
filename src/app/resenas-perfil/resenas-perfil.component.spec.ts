import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenasPerfilComponent } from './resenas-perfil.component';

describe('ResenasPerfilComponent', () => {
  let component: ResenasPerfilComponent;
  let fixture: ComponentFixture<ResenasPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResenasPerfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResenasPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
