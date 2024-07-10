import { Component } from '@angular/core'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatButtonModule } from '@angular/material/button'
import { ReactiveFormsModule, FormControl } from '@angular/forms'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonToggleModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  titleList: string[] = ['Now Playing', 'Popular', 'Upcoming']
  titleControl = new FormControl(this.titleList[0])
}
