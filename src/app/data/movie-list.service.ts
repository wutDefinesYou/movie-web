import { inject, Injectable } from '@angular/core'
import { Functions, httpsCallable } from '@angular/fire/functions'
import { from, map } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class MovieListService {
  private functions = inject(Functions)

  constructor() {}

  getApi() {
    const requestTMDB = httpsCallable(this.functions, 'requestToTMDB')
    return from(requestTMDB()).pipe(map(({ data }) => data))
  }
}
