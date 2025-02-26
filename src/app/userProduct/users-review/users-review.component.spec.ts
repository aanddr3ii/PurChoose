import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersReviewComponent } from './users-review.component';

describe('UsersReviewComponent', () => {
  let component: UsersReviewComponent;
  let fixture: ComponentFixture<UsersReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
