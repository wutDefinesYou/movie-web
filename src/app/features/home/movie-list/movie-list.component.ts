import { Component, inject, signal } from '@angular/core'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MovieCardComponent } from '../movie-card/movie-card.component'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MovieListService } from '../../../data/services/movie-list.service'
import { MovieResult } from '../../../data/interfaces/movie-list'

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MatButtonToggleModule, ReactiveFormsModule, MovieCardComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent {
  private movieListService = inject(MovieListService)

  movieListTypeControl = new FormControl('Now Playing')
  currentMovieList = signal<MovieResult[] | undefined>(undefined)

  ngOnInit() {
    this.getNowPlayingList()
  }

  getNowPlayingList() {
    this.movieListService
      .getNowPlaying()
      .subscribe(() =>
        this.currentMovieList.set(this.movieListService.nowPlaying())
      )
  }

  getUpcomingList() {
    this.movieListService
      .getUpcoming()
      .subscribe(() =>
        this.currentMovieList.set(this.movieListService.upcoming())
      )
  }

  getPopularList() {
    this.movieListService
      .getPopular()
      .subscribe(() =>
        this.currentMovieList.set(this.movieListService.popular())
      )
  }

  onMovieListTypeChanged() {
    switch (this.movieListType) {
      case 'Upcoming':
        if (this.movieListService.upcoming().length === 0)
          this.getUpcomingList()
        else this.currentMovieList.set(this.movieListService.upcoming())
        break
      case 'Popular':
        if (this.movieListService.popular().length === 0) this.getPopularList()
        else this.currentMovieList.set(this.movieListService.popular())
        break
      default:
        this.currentMovieList.set(this.movieListService.nowPlaying())
        break
    }
  }

  get movieListType(): string {
    return this.movieListTypeControl.value ?? ''
  }
}
