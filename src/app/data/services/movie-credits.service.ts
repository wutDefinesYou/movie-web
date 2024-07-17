import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { environment } from '../../../environments/environment.development'
import { Crew, MovieCreditsList } from '../interfaces/movie-credits'
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class MovieCreditsService {
  private http = inject(HttpClient)

  private readonly tmdbUrl = environment.tmdbApiUrl

  getCredits(movieId: number) {
    return this.http
      .get<MovieCreditsList>(`${this.tmdbUrl}/movie/${movieId}/credits`)
      .pipe(
        map(({ cast, crew }: MovieCreditsList) => {
          const directors = crew.filter(
            (member: Crew) => member.job === 'Director'
          )
          const actors = cast
          return [directors, actors]
        })
      )
  }
}
