import { TestBed } from '@angular/core/testing';

import { TrendingListService } from './trending-list.service';

describe('TrendingListService', () => {
  let service: TrendingListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrendingListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
