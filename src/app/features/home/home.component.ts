import { Component } from '@angular/core'

import { TrendingListComponent } from './trending-list/trending-list.component'
import { MovieListComponent } from './movie-list/movie-list.component'
import { TvShowListComponent } from './tv-show-list/tv-show-list.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TrendingListComponent,
    MovieListComponent,
    TvShowListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
