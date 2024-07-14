import { inject, Injectable, signal } from '@angular/core'
import { map, Observable, tap } from 'rxjs'
import { environment } from '../../../environments/environment.development'
import { HttpClient } from '@angular/common/http'
import {
  MovieList,
  MovieListWithoutDates,
  MovieResult,
} from '../interfaces/movie-list'

@Injectable({
  providedIn: 'root',
})
export class MovieListService {
  private http = inject(HttpClient)

  private readonly apiUrl = `${environment.tmdbApiUrl}/movie`
  private nowPlayingSignal = signal<MovieResult[]>([])
  readonly nowPlaying = this.nowPlayingSignal.asReadonly()
  private popularSignal = signal<MovieResult[]>([])
  readonly popular = this.popularSignal.asReadonly()
  private upcomingSignal = signal<MovieResult[]>([])
  readonly upcoming = this.upcomingSignal.asReadonly()
  private topRatedSignal = signal<MovieResult[]>([])
  readonly topRated = this.topRatedSignal.asReadonly()

  constructor() {}

  getNowPlaying() {
    return this.http.get<MovieList>(`${this.apiUrl}/now_playing`).pipe(
      map(({ results }: MovieList) => results),
      tap((results) => this.nowPlayingSignal.set(results))
    )
  }

  getPopular(): Observable<MovieResult[]> {
    return this.http.get<MovieListWithoutDates>(`${this.apiUrl}/popular`).pipe(
      map(({ results }: MovieListWithoutDates) => results),
      tap((results) => this.popularSignal.set(results))
    )
  }

  getTopRated(): Observable<MovieResult[]> {
    return this.http
      .get<MovieListWithoutDates>(`${this.apiUrl}/top_rated`)
      .pipe(
        map(({ results }: MovieListWithoutDates) => results),
        tap((results) => this.topRatedSignal.set(results))
      )
  }

  getUpcoming(): Observable<MovieResult[]> {
    return this.http.get<MovieList>(`${this.apiUrl}/upcoming`).pipe(
      map(({ results }: MovieList) => results),
      tap((results) => this.upcomingSignal.set(results))
    )
  }
}
