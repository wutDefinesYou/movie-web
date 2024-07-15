import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { environment } from '../../../environments/environment.development'
import { MovieDetails } from '../interfaces/movie-details'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient)

  private readonly tmdbUrl = environment.tmdbApiUrl

  getMovieDetails(movieId: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`${this.tmdbUrl}/movie/${movieId}`)
  }
}
