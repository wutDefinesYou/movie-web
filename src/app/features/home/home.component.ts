import { Component, inject } from '@angular/core'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatButtonModule } from '@angular/material/button'
import { ReactiveFormsModule, FormControl } from '@angular/forms'
import { MovieListService } from '../../data/movie-list.service'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonToggleModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  titleList: string[] = ['Now Playing', 'Upcoming']
  titleControl = new FormControl(this.titleList[0])

  private movieListService = inject(MovieListService)

  ngOnInit() {
    this.movieListService.getApi()
  }
}
