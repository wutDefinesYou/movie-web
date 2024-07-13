import { Routes } from '@angular/router'
import { HomeComponent } from './features/home/home.component'
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component'

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent },
]
