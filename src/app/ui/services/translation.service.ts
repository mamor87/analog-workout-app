import { Injectable } from '@angular/core';
import { Translations } from '../../../shared/tools/translations';

@Injectable()
export class TranslationService {
  private static readonly implementation = new Translations();

  async load(url: string) {
    const response = await fetch(url);
    const data = await response.json();
    TranslationService.implementation.load(data);
  }

  get(key: string, params: { [key: string]: string } = {}) {
    return TranslationService.implementation.get(key, params);
  }

  map(target: {
    [key: string]: { key: string; params: { [key: string]: string } };
  }) {
    return TranslationService.implementation.map(target);
  }
}
