import { Language } from './Language';

export class LanguageOption {
  public name: string;
  public abbrev: Language;

  constructor(params?: Partial<LanguageOption>) {
    if (!!params) {
      this.name = params.name || this.name;
      this.abbrev = params.abbrev || this.abbrev;
    }
  }
}
