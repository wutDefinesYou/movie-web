import { Component, input, signal } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import {
  MovieResult,
  TrendingMovieResult,
} from '../../../data/interfaces/movie-list'
import { DecimalPipe } from '@angular/common'
import {
  TrendingTVShowResult,
  TVShowResult,
} from '../../../data/interfaces/tv-show-list'

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [MatCardModule, DecimalPipe],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  item = input.required<
    MovieResult | TVShowResult | TrendingMovieResult | TrendingTVShowResult
  >()
  isMovie = input.required<boolean>()
  movie = signal<MovieResult | TrendingMovieResult | null>(null)
  tvShow = signal<TVShowResult | TrendingTVShowResult | null>(null)
  poster_path: string | undefined

  ngOnInit() {
    this.poster_path = this.item().poster_path
      ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${
          this.item().poster_path
        }`
      : '/assets/images/image-placeholder.svg'

    this.isMovie()
      ? this.movie.set(this.item() as MovieResult | TrendingMovieResult)
      : this.tvShow.set(this.item() as TVShowResult | TrendingTVShowResult)
  }
}
