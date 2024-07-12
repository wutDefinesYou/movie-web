import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { TVShowList, TVShowResult } from '../interfaces/tv-show-list'
import { environment } from '../../../environments/environment.development'
import { map, Observable, tap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class TvshowListService {
  private http = inject(HttpClient)

  private readonly apiUrl = `${environment.tmdbApiUrl}/tv`
  private airingTodaySignal = signal<TVShowResult[]>([])
  readonly airingToday = this.airingTodaySignal.asReadonly()
  private onTheAirSignal = signal<TVShowResult[]>([])
  readonly onTheAir = this.onTheAirSignal.asReadonly()
  private popularSignal = signal<TVShowResult[]>([])
  readonly popular = this.popularSignal.asReadonly()

  getAiringToday(): Observable<TVShowResult[]> {
    return this.http.get<TVShowList>(`${this.apiUrl}/airing_today`).pipe(
      map(({ results }: TVShowList) => results),
      tap((results) => this.airingTodaySignal.set(results))
    )
  }

  getOnTheAir(): Observable<TVShowResult[]> {
    return this.http.get<TVShowList>(`${this.apiUrl}/on_the_air`).pipe(
      map(({ results }: TVShowList) => results),
      tap((results) => this.onTheAirSignal.set(results))
    )
  }

  getPopular(): Observable<TVShowResult[]> {
    return this.http.get<TVShowList>(`${this.apiUrl}/popular`).pipe(
      map(({ results }: TVShowList) => results),
      tap((results) => this.popularSignal.set(results))
    )
  }
}
