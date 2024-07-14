import { Component, inject, signal } from '@angular/core'

import { TrendingListComponent } from './trending-list/trending-list.component'
import { MovieListComponent } from './movie-list/movie-list.component'
import { TvShowListComponent } from './tv-show-list/tv-show-list.component'
import { MovieCardRatingComponent } from './movie-card-rating/movie-card-rating.component'
import { MovieResult } from '../../data/interfaces/movie-list'
import { DiscoverMovieService } from '../../data/services/discover-movie.service'
import { MovieListService } from '../../data/services/movie-list.service'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TrendingListComponent,
    MovieListComponent,
    TvShowListComponent,
    MovieCardRatingComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private discoverMovieService = inject(DiscoverMovieService)
  private movieListService = inject(MovieListService)

  ngOnInit() {
    if (this.topRatedMovieLast30days.length === 0)
      this.getTopRatedMovieLast30days()
    if (this.topRatedMovies.length === 0) this.getTopRatedMovies()
    if (this.topRatedMoviesThisYear.length === 0)
      this.getTopRatedMoviesThisYear()
  }

  getTopRatedMovieLast30days() {
    this.discoverMovieService.getLast30daysTopRated().subscribe()
  }

  getTopRatedMoviesThisYear() {
    this.discoverMovieService.getThisYearTopRated().subscribe()
  }

  getTopRatedMovies() {
    this.movieListService.getTopRated().subscribe()
  }

  get topRatedMovieLast30days() {
    return this.discoverMovieService.last30days()
  }

  get topRatedMovies() {
    return this.movieListService.topRated()
  }

  get topRatedMoviesThisYear() {
    return this.discoverMovieService.thisYear()
  }
}
