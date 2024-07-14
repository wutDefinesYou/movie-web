import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardRatingComponent } from './movie-card-rating.component';

describe('MovieCardRatingComponent', () => {
  let component: MovieCardRatingComponent;
  let fixture: ComponentFixture<MovieCardRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardRatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCardRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
