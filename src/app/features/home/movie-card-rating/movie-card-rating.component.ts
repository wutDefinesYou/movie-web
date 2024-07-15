import { Component, input } from '@angular/core'
import { MovieResult } from '../../../data/interfaces/movie-list'
import { DecimalPipe } from '@angular/common'
import { ImageFallbackPipe } from '../../../shared/pipes/image-fallback.pipe'

@Component({
  selector: 'app-movie-card-rating',
  standalone: true,
  imports: [DecimalPipe, ImageFallbackPipe],
  templateUrl: './movie-card-rating.component.html',
  styleUrl: './movie-card-rating.component.scss',
})
export class MovieCardRatingComponent {
  title = input.required<string>()
  list = input.required<MovieResult[]>()

  getPosterPath(movie: MovieResult) {
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`
  }
}
