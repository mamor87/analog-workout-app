import { defineEventHandler, getRouterParam } from 'h3';
import { Translations } from '../../../../shared/tools/translations';
import DE from '../../../translations/de';
import EN from '../../../translations/en';

const translations = new Translations();
const fallbackLanguage = 'en-US';
const unspecificCodeSelector: Record<string, string> = {
  'de': 'de-DE',
  'en': 'en-US',
}
const translationSources: Record<string, Record<string, string>> = {
  'de-DE': DE,
  'en-US': EN,
};

export default defineEventHandler((event) => {
  const code = getRouterParam(event, 'code');
  let selectedCode = fallbackLanguage;
  if (code) {
    if (code.includes('-')) {
      selectedCode = translationSources[code] ? code : fallbackLanguage;
    } else {
      if (unspecificCodeSelector[code]) {
        selectedCode = translationSources[unspecificCodeSelector[code]] ? unspecificCodeSelector[code] : fallbackLanguage;
      }
    }
  }
  translations.load(translationSources[selectedCode]);
  return translations.getSource();
});
