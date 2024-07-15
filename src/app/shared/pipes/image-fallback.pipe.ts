import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'imageFallback',
  standalone: true,
})
export class ImageFallbackPipe implements PipeTransform {
  transform(value: string | undefined | null): string {
    return value ?? '/assets/images/image-placeholder.svg'
  }
}
