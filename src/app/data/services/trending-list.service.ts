import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { TrendingMovieResult } from '../interfaces/movie-list'
import { TrendingTVShowResult } from '../interfaces/tv-show-list'
import { environment } from '../../../environments/environment.development'
import { map, Observable, tap } from 'rxjs'
import { TrendingList } from '../interfaces/trending-list'

@Injectable({
  providedIn: 'root',
})
export class TrendingListService {
  private http = inject(HttpClient)

  private readonly tmdbUrl: string = environment.tmdbApiUrl
  private dayTrendingSignal = signal<
    (TrendingMovieResult | TrendingTVShowResult)[]
  >([])
  readonly dayTrending = this.dayTrendingSignal.asReadonly()
  private weekTrendingSignal = signal<
    (TrendingMovieResult | TrendingTVShowResult)[]
  >([])
  readonly weekTrending = this.weekTrendingSignal.asReadonly()

  getTrendingList(
    timeWindow: string
  ): Observable<(TrendingMovieResult | TrendingTVShowResult)[]> {
    return this.http
      .get<TrendingList>(`${this.tmdbUrl}/trending/all/${timeWindow}`)
      .pipe(
        map(({ results }: TrendingList) => results),
        tap((results) =>
          timeWindow === 'day'
            ? this.dayTrendingSignal.set(results)
            : this.weekTrendingSignal.set(results)
        )
      )
  }
}
