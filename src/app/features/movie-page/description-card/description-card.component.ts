import { Component, input, signal } from '@angular/core'
import { MovieDetails } from '../../../data/interfaces/movie-details'
import { AsyncPipe, DatePipe } from '@angular/common'
import { ImageFallbackPipe } from '../../../shared/pipes/image-fallback.pipe'
import { MinToHrPipe } from '../../../shared/pipes/min-to-hr.pipe'

@Component({
  selector: 'app-description-card',
  standalone: true,
  imports: [AsyncPipe, ImageFallbackPipe, DatePipe, MinToHrPipe],
  templateUrl: './description-card.component.html',
  styleUrl: './description-card.component.scss',
})
export class DescriptionCardComponent {
  movieDetails = input.required<MovieDetails>()
  certification = input.required<string>()
  posterPath = signal<string | undefined>(undefined)

  ngOnInit() {
    this.posterPath.set(
      `https://www.themoviedb.org/t/p/w220_and_h330_face${
        this.movieDetails().poster_path
      }`
    )
  }
}
