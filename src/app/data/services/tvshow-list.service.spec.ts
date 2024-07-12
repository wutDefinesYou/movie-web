import { TestBed } from '@angular/core/testing';

import { TvshowListService } from './tvshow-list.service';

describe('TvshowListService', () => {
  let service: TvshowListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvshowListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
