import { HttpInterceptorFn } from '@angular/common/http'
import { environment } from '../../../environments/environment.development'

export const tmdbApiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const isTMDBApiUrl: boolean = req.url.startsWith(environment.tmdbApiUrl)

  if (isTMDBApiUrl) {
    // const functions = inject(Functions)
    // const requestTMDB = httpsCallable(functions, 'requestToTMDB')
    // const apiKey = await requestTMDB().data
    const apiKey = environment.tmdbApiKey
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${apiKey}` },
    })
  }
  return next(req)
}
