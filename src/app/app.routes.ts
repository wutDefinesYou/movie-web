import { Routes } from '@angular/router'
import { HomeComponent } from './features/home/home.component'
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component'
import { MoviePageComponent } from './features/movie-page/movie-page.component'

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie/:movieId', component: MoviePageComponent},
  { path: '**', component: PageNotFoundComponent },
]
