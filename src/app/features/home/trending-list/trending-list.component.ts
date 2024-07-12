import { Component, inject, signal } from '@angular/core'
import { TrendingListService } from '../../../data/services/trending-list.service'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { TrendingMovieResult } from '../../../data/interfaces/movie-list'
import { TrendingTVShowResult } from '../../../data/interfaces/tv-show-list'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MovieCardComponent } from '../movie-card/movie-card.component'

@Component({
  selector: 'app-trending-list',
  standalone: true,
  imports: [MatButtonToggleModule, ReactiveFormsModule, MovieCardComponent],
  templateUrl: './trending-list.component.html',
  styleUrl: './trending-list.component.scss',
})
export class TrendingListComponent {
  private trendingListService = inject(TrendingListService)

  trendingListTypeControl = new FormControl('day')
  currentTrendingList = signal<
    (TrendingMovieResult | TrendingTVShowResult)[] | undefined
  >(undefined)

  ngOnInit() {
    this.getTrendingList(this.trendingListTimeWindow)
  }

  getTrendingList(timeWindow: string) {
    this.trendingListService
      .getTrendingList(timeWindow)
      .subscribe(() =>
        this.currentTrendingList.set(
          timeWindow === 'day'
            ? this.trendingListService.dayTrending()
            : this.trendingListService.weekTrending()
        )
      )
  }

  onTrendingListTypeChanged() {
    if (
      this.trendingListTimeWindow === 'week' &&
      this.trendingListService.weekTrending().length === 0
    )
      this.getTrendingList('week')
    else {
      const value =
        this.trendingListTimeWindow === 'day'
          ? this.trendingListService.dayTrending()
          : this.trendingListService.weekTrending()
      this.currentTrendingList.set(value)
    }
  }

  get trendingListTimeWindow(): string {
    return this.trendingListTypeControl.value ?? ''
  }
}
