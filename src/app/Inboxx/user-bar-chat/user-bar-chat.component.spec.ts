import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBarChatComponent } from './user-bar-chat.component';

describe('UserBarChatComponent', () => {
  let component: UserBarChatComponent;
  let fixture: ComponentFixture<UserBarChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBarChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBarChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
