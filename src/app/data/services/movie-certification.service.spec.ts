import { TestBed } from '@angular/core/testing';

import { MovieCertificationService } from './movie-certification.service';

describe('MovieCertificationService', () => {
  let service: MovieCertificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieCertificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
