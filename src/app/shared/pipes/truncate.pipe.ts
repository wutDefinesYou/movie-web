import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number, toggle: boolean): unknown {
    if (!toggle) return value
    if (value.length <= limit) return value
    return value.substring(0, limit) + '...'
  }
}
