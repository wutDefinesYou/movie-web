import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { environment } from '../../../environments/environment.development'
import {
  MovieReleaseDateList,
  MovieReleaseDateResult,
} from '../interfaces/movie-release-date'
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class MovieCertificationService {
  private http = inject(HttpClient)

  private readonly tmdbUrl = environment.tmdbApiUrl

  getMovieCertification(movieId: number) {
    return this.http
      .get<MovieReleaseDateList>(
        `${this.tmdbUrl}/movie/${movieId}/release_dates`
      )
      .pipe(
        map(({ results }: MovieReleaseDateList) => {
          const usReleaseDate = results.find(
            (result: MovieReleaseDateResult) => result.iso_3166_1 === 'US'
          )
          return usReleaseDate?.release_dates[0]?.certification
            ? usReleaseDate.release_dates[0].certification
            : 'NR'
        })
      )
  }
}
