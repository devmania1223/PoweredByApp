import { Language } from './Language';
import { LanguageOption } from './LanguageOption';

export class LanguageOptions {
  public static getLanguageOptions(): LanguageOption[] {
    return [
      {
        name: 'English',
        abbrev: Language.English,
      },
      {
        name: 'Spanish',
        abbrev: Language.Spanish,
      },
    ];
  }
}
