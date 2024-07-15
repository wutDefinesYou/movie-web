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
import { ImageFallbackPipe } from '../../../shared/pipes/image-fallback.pipe'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [MatCardModule, DecimalPipe, ImageFallbackPipe, RouterModule],
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
  posterPath = signal<string | undefined>(undefined)

  ngOnInit() {
    this.posterPath.set(
      `https://www.themoviedb.org/t/p/w220_and_h330_face${
        this.item().poster_path
      }`
    )

    this.isMovie()
      ? this.movie.set(this.item() as MovieResult | TrendingMovieResult)
      : this.tvShow.set(this.item() as TVShowResult | TrendingTVShowResult)
  }
}
