import { Component, inject, signal } from '@angular/core'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MovieCardComponent } from '../movie-card/movie-card.component'
import { TvshowListService } from '../../../data/services/tvshow-list.service'
import { TVShowResult } from '../../../data/interfaces/tv-show-list'

@Component({
  selector: 'app-tv-show-list',
  standalone: true,
  imports: [MatButtonToggleModule, ReactiveFormsModule, MovieCardComponent],
  templateUrl: './tv-show-list.component.html',
  styleUrl: './tv-show-list.component.scss',
})
export class TvShowListComponent {
  private tvShowListService = inject(TvshowListService)

  tvShowListTypeControl = new FormControl('Airing Today')
  currentTVShowList = signal<TVShowResult[] | undefined>(undefined)

  ngOnInit() {
    this.getAiringList()
  }

  getAiringList() {
    this.tvShowListService
      .getAiringToday()
      .subscribe(() =>
        this.currentTVShowList.set(this.tvShowListService.airingToday())
      )
  }

  getOnTheAirList() {
    this.tvShowListService
      .getOnTheAir()
      .subscribe(() =>
        this.currentTVShowList.set(this.tvShowListService.onTheAir())
      )
  }

  getPopularList() {
    this.tvShowListService
      .getPopular()
      .subscribe(() =>
        this.currentTVShowList.set(this.tvShowListService.popular())
      )
  }

  onTVShowListTypeChanged() {
    switch (this.tvShowListType) {
      case 'On The Air':
        if (this.tvShowListService.onTheAir().length === 0)
          this.getOnTheAirList()
        else this.currentTVShowList.set(this.tvShowListService.onTheAir())
        break
      case 'Popular':
        if (this.tvShowListService.popular().length === 0) this.getPopularList()
        else this.currentTVShowList.set(this.tvShowListService.popular())
        break
      default:
        this.currentTVShowList.set(this.tvShowListService.airingToday())
        break
    }
  }

  get tvShowListType(): string {
    return this.tvShowListTypeControl.value ?? ''
  }
}
