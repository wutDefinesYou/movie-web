import { Component, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MovieService } from '../../data/services/movie.service'
import { MovieDetails } from '../../data/interfaces/movie-details'
import { DescriptionCardComponent } from './description-card/description-card.component'
import { MovieCertificationService } from '../../data/services/movie-certification.service'

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [DescriptionCardComponent],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.scss',
})
export class MoviePageComponent {
  private route = inject(ActivatedRoute)
  private movieService = inject(MovieService)
  private movieCertificationService = inject(MovieCertificationService)

  movieDetails: MovieDetails | undefined
  certification: string = 'NR'

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('movieId')
    if (id) {
      this.movieService
        .getMovieDetails(+id)
        .subscribe((result) => (this.movieDetails = result))
      this.movieCertificationService
        .getMovieCertification(+id)
        .subscribe((result) => (this.certification = result))
    }
  }
}
