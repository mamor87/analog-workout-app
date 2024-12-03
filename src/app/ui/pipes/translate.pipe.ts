import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translate',
  pure: true,
  standalone: true,
})
export class TranslatePipe implements PipeTransform {
  private readonly translationService = inject(TranslationService);

  transform(value: string, params: { [key: string]: string } = {}): string {
    return this.translationService.get(value, params);
  }
}
