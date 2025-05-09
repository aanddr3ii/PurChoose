import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageBarComponent } from './language-bar.component';

describe('LanguageBarComponent', () => {
  let component: LanguageBarComponent;
  let fixture: ComponentFixture<LanguageBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
