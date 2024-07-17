import { Component, input, signal } from '@angular/core'
import { MovieDetails } from '../../../data/interfaces/movie-details'
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe'

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [TruncatePipe],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  movieDetails = input.required<MovieDetails>()
  isTruncating = signal<boolean>(true)

  toggleTruncate() {
    this.isTruncating.update((val) => !val)
  }
}
