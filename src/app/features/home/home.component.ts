import { Component, inject, signal, Signal } from '@angular/core'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatButtonModule } from '@angular/material/button'
import { ReactiveFormsModule, FormControl } from '@angular/forms'
import { MovieListService } from '../../data/services/movie-list.service'
import { MovieCardComponent } from '../movie-card/movie-card.component'
import { MovieResult } from '../../data/interfaces/movie-list'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    MatButtonModule,
    ReactiveFormsModule,
    MovieCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private movieListService = inject(MovieListService)

  movieListTypeControl = new FormControl('Now Playing')
  currentMovieListType = signal<MovieResult[] | undefined>(undefined)

  ngOnInit() {
    this.getNowPlayingList()
  }

  getNowPlayingList() {
    this.movieListService
      .getNowPlaying()
      .subscribe(() =>
        this.currentMovieListType.set(this.movieListService.nowPlaying())
      )
  }

  getPopularList() {
    this.movieListService
      .getPopular()
      .subscribe(() =>
        this.currentMovieListType.set(this.movieListService.popular())
      )
  }

  onMovieListTypeChanged() {
    if (
      this.movieListType === 'Popular' &&
      this.currentMovieListType() !== this.movieListService.popular()
    )
      this.getPopularList()
    else {
      const value =
        this.movieListType === 'Now Playing'
          ? this.movieListService.nowPlaying()
          : this.movieListService.popular()
      this.currentMovieListType.set(value)
    }
  }

  get movieListType() {
    return this.movieListTypeControl.value
  }
}
