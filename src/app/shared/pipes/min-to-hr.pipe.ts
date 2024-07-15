import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'minToHr',
  standalone: true,
})
export class MinToHrPipe implements PipeTransform {
  transform(value: number): string {
    const result = Math.floor(value / 60)
    const remainder = value % 60
    return `${result}h ${remainder}m`
  }
}
