import { TestBed } from '@angular/core/testing';

import { UserReviewService } from './user-review.service';

describe('UserReivewService', () => {
  let service: UserReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
