import { Component, input } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MovieResult } from '../../data/interfaces/movie-list'
import { DecimalPipe } from '@angular/common'

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [MatCardModule, DecimalPipe],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  movie = input.required<MovieResult>()
  poster_path: string | undefined

  ngOnInit() {
    this.poster_path = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${
      this.movie().poster_path
    }`
  }
}
