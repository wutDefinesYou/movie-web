import { HttpClient, HttpParams } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { environment } from '../../../environments/environment.development'
import { DatePipe } from '@angular/common'
import { MovieList, MovieResult } from '../interfaces/movie-list'
import { map, tap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class DiscoverMovieService {
  private http = inject(HttpClient)
  private datePipe = inject(DatePipe)

  private readonly apiUrl = environment.tmdbApiUrl
  private last30daysSignal = signal<MovieResult[]>([])
  last30days = this.last30daysSignal.asReadonly()
  private thisYearSignal = signal<MovieResult[]>([])
  thisYear = this.thisYearSignal.asReadonly()

  getLast30daysTopRated() {
    const today = new Date()
    const before = this.datePipe.transform(
      new Date(new Date().setDate(today.getDate() - 30)),
      'yyyy-MM-dd'
    )

    const params = new HttpParams()
      .set('include_adult', false)
      .set('include_video', false)
      .set('language', 'en-US')
      .set('page', 1)
      .set('sort_by', 'vote_average.desc')
      .set('primary_release_date.gte', before!)
      .set('without_genres', '99,10755')
      .set('vote_count.gte', 200)

    return this.http
      .get<MovieList>(`${this.apiUrl}/discover/movie`, {
        params,
      })
      .pipe(
        map(({ results }: MovieList) => results),
        tap((results) => this.last30daysSignal.set(results))
      )
  }

  getThisYearTopRated() {
    const firstDate = this.datePipe.transform(
      new Date(new Date().getFullYear(), 0, 1),
      'yyyy-MM-dd'
    )

    const params = new HttpParams()
      .set('include_adult', false)
      .set('include_video', false)
      .set('language', 'en-US')
      .set('page', 1)
      .set('sort_by', 'vote_average.desc')
      .set('primary_release_date.gte', firstDate!)
      .set('without_genres', '99,10755')
      .set('vote_count.gte', 200)

    return this.http
      .get<MovieList>(`${this.apiUrl}/discover/movie`, {
        params,
      })
      .pipe(
        map(({ results }: MovieList) => results),
        tap((results) => this.thisYearSignal.set(results))
      )
  }
}
